import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { containerProperties } from "./PortainerContainerProperties";
import { endpointProperties } from "./PortainerEndpointProperties";
import {
  AUTHENTICATION_PROP,
  BASE_URL_PROP,
  RESOURCE_TYPE_PROP,
} from "./PortainerNodeConst";
import { PortainerNodeExecutor } from "./PortainerNodeExecutor";

export class PortainerNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Portainer",
    name: "portainer",
    group: ["development"],
    version: 1,
    description: "Interact with Portainer",
    defaults: {
      name: "Portainer",
      color: "#772244",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "portainerInternalCredentials",
        required: true,
        displayOptions: {
          show: {
            authentication: ["portainerInternalCredentials"],
          },
        },
      },
    ],
    properties: [
      {
        displayName: "Authentication",
        name: AUTHENTICATION_PROP,
        type: "options",
        options: [
          {
            name: "Portainer internal authentication",
            value: "portainerInternalCredentials",
          },
        ],
        required: true,
        default: "portainerInternalCredentials",
        description: "The way to authenticate.",
      },
      {
        displayName: "Base URL",
        name: BASE_URL_PROP,
        type: "string",
        required: true,
        default: "",
        description: "Base URL of Portainer instance.",
      },
      {
        displayName: "Resource type",
        name: RESOURCE_TYPE_PROP,
        type: "options",
        default: "",
        options: [{ name: "Container", value: "container" }],
        required: true,
        description: "Type of resource to intercat with.",
      },
      ...endpointProperties,
      ...containerProperties,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const executor = new PortainerNodeExecutor(this);
    return executor.execute();
  }
}
