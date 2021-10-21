import { INodeProperties } from "n8n-workflow";
import { ENDPOINT_ID_PROP, RESOURCE_TYPE_PROP } from "./PortainerNodeConst";

export const endpointProperties: INodeProperties[] = [
  {
    displayName: "Endpoint ID",
    name: ENDPOINT_ID_PROP,
    type: "string",
    default: "",
    description: "Endpoint ID.",
    displayOptions: {
      show: {
        [RESOURCE_TYPE_PROP]: ["endpoint", "container"],
      },
    },
  },
];
