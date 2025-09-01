export interface ElectionDataDTO {
  Id: string;
  AssemblyProcessID: string;
  ElectionTitle?: string;
  ElectionDiscription?: string;
  CondicateBDCount: number;
  CondicateInspectorCount: number;
  IsActive?: boolean;
  StartDate?: string;
  EndDate?: string;
  IsActiveDB?: boolean;
  IsActiveInspector?: boolean;
  IsActiveMeeting?: boolean;
}
