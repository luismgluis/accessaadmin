import utils from "../libs/utils/utils";

const TAG = "RESIDENT ACCESS TYPE";

export interface ResidentAccessType {
  id?: string;
  comment: string;
  creationDate: number;
  idResident: string;
  idValidator: string;
  sector: string;
  exit: boolean;
}
export class ResidentAccess implements ResidentAccessType {
  id: string;
  comment: string;
  creationDate: number;
  idResident: string;
  idValidator: string;
  sector: string;
  exit: boolean;
  constructor(id: string, data: ResidentAccessType | null) {
    this.id = id;
    this.comment = data?.comment || "";
    this.creationDate = data?.creationDate || 0;
    this.idResident = data?.idResident || "";
    this.sector = data?.sector || "";
    this.idValidator = data?.idValidator || "";
    this.exit = utils.objects.isEmpty(data?.exit) ? false : data!.exit;
  }
  isEmpty(): boolean {
    console.log(TAG, this.id);
    if (typeof this.id === "undefined") {
      return true;
    }
    if (this.id !== "" && this.creationDate !== 0) {
      return false;
    }
    return true;
  }
  exportToUpload(): ResidentAccessType {
    return {
      comment: this.comment,
      creationDate: this.creationDate,
      idResident: this.idResident,
      sector: this.sector,
      idValidator: this.idValidator,
      exit: this.exit,
    };
  }
}
