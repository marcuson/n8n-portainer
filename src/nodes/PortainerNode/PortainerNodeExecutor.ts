import { IExecuteFunctions } from "n8n-core";
import { INodeExecutionData } from "n8n-workflow";
import { OptionsWithUri } from "request-promise-native";
import { PortainerInternalCredentialsObject } from "../../credentials/Portainer/InternalCredentials/PortainerInternalCredentials.credentials";
import {
  BASE_URL_PROP,
  CONTAINER_ACTION_PROP,
  CONTAINER_ID_PROP,
  ENDPOINT_ID_PROP,
  RESOURCE_TYPE_PROP,
} from "./PortainerNodeConst";

export class PortainerNodeExecutor {
  executionCtx: IExecuteFunctions;

  constructor(execCtx: IExecuteFunctions) {
    this.executionCtx = execCtx;
  }

  async execute(): Promise<INodeExecutionData[][]> {
    const execCtx = this.executionCtx;
    const items = execCtx.getInputData();

    const returnItems: INodeExecutionData[] = [];

    const portainerBaseUrl = execCtx.getNodeParameter(
      BASE_URL_PROP,
      0
    ) as string;
    const resource = execCtx.getNodeParameter(RESOURCE_TYPE_PROP, 0) as string;
    const endpointId = execCtx.getNodeParameter(ENDPOINT_ID_PROP, 0) as string;
    const containerId = execCtx.getNodeParameter(
      CONTAINER_ID_PROP,
      0
    ) as string;
    const containerAction = execCtx.getNodeParameter(
      CONTAINER_ACTION_PROP,
      0
    ) as string;

    const authData = await this.authenticate();

    for (const _ of items) {
      let itemResp: INodeExecutionData;

      switch (resource) {
        case "container":
          itemResp = await this.handleContainer({
            baseUrl: portainerBaseUrl,
            containerId,
            endpointId,
            jwt: authData.jwt,
            action: containerAction,
          });
          break;
        default:
          throw new Error(`Unrecognized resource type "${resource}"`);
      }

      returnItems.push(itemResp);
    }

    return execCtx.prepareOutputData(returnItems);
  }

  async authenticate() {
    const execCtx = this.executionCtx;

    const portainerInternalCredentials = (await execCtx.getCredentials(
      "portainerInternalCredentials"
    )) as unknown as PortainerInternalCredentialsObject;
    const portainerBaseUrl = execCtx.getNodeParameter(
      BASE_URL_PROP,
      0
    ) as string;

    const authReqOptions = {
      headers: {
        accept: "application/json",
      },
      method: "POST",
      body: portainerInternalCredentials,
      uri: `${portainerBaseUrl}/api/auth`,
      json: true,
    } as OptionsWithUri;

    const res = await execCtx.helpers.request(authReqOptions);
    return res as { jwt: string };
  }

  async handleContainer(data: {
    jwt: string;
    baseUrl: string;
    endpointId: string;
    containerId: string;
    action: string;
  }): Promise<INodeExecutionData> {
    const execCtx = this.executionCtx;

    const reqOptions = {
      headers: {
        authorization: `Bearer ${data.jwt}`,
      },
      method: "POST",
      uri: `${data.baseUrl}/api/endpoints/${data.endpointId}/docker/containers/${data.containerId}/${data.action}`,
      json: true,
    } as OptionsWithUri;

    const resp = await execCtx.helpers.request(reqOptions);
    console.log(resp);

    return { json: { containerId: data.containerId, success: true } };
  }
}
