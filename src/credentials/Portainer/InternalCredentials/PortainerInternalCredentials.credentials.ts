import { ICredentialType, NodePropertyTypes } from "n8n-workflow";
import { nameof } from "ts-simple-nameof";

export interface PortainerInternalCredentialsObject {
  username: string;
  password: string;
}

export class PortainerInternalCredentials implements ICredentialType {
  name = "portainerInternalCredentials";
  displayName = "Portainer internal credentials";
  properties = [
    {
      displayName: "Username",
      name: nameof<PortainerInternalCredentialsObject>((o) => o.username),
      type: "string" as NodePropertyTypes,
      default: "",
    },
    {
      displayName: "Password",
      name: nameof<PortainerInternalCredentialsObject>((o) => o.password),
      type: "string" as NodePropertyTypes,
      default: "",
    },
  ];
}
