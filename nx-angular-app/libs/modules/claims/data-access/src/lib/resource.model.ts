export interface Resource {
  id?: string;
  name: string;
  apiName: string;
  description: string;
}

export interface Permission {
  id: string;
  type: string;
  value: string;
  description: string;
  resourceId: number;
  requestTypeId: number;
}
