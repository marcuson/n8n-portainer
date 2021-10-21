import { INodeProperties } from "n8n-workflow";
import {
  CONTAINER_ACTION_PROP,
  CONTAINER_ID_PROP,
  RESOURCE_TYPE_PROP,
} from "./PortainerNodeConst";

export const containerProperties: INodeProperties[] = [
  {
    displayName: "Action",
    name: CONTAINER_ACTION_PROP,
    type: "options",
    default: "",
    required: true,
    description: "Container action to perform.",
    options: [
      {
        name: "Restart",
        value: "restart",
      },
    ],
    displayOptions: {
      show: {
        [RESOURCE_TYPE_PROP]: ["container"],
      },
    },
  },
  {
    displayName: "Container ID or name",
    name: CONTAINER_ID_PROP,
    type: "string",
    default: "",
    required: true,
    description: "Container ID or name.",
    displayOptions: {
      show: {
        [RESOURCE_TYPE_PROP]: ["container"],
      },
    },
  },
];
