import utils from "../libs/utils/utils";
type OptionalDataItem = {
  name: string;
  value: string;
};

export interface ResidentTypeType {
  name: string;
  sector?: string;
  idCard: string;
  qr?: string;
  telegram: string;
  phone: string;
  profileImage: string;
  idCardImage?: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
  profession?: string;
}
class ResidentType implements ResidentTypeType {
  id: string;
  name: string;
  sector: string;
  idCard: string;
  qr: string;
  telegram: string;
  phone: string;
  profileImage: string;
  idCardImage?: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
  profession?: string;
  constructor(id: string, data: ResidentTypeType | null) {
    this.id = id;
    this.name = data?.name || "";
    this.sector = data?.sector || "";
    this.idCard = data?.idCard || "";
    this.qr = data?.qr || "";
    this.telegram = data?.telegram || "";
    this.phone = data?.phone || "";
    this.profileImage = data?.profileImage || "";
    this.idCardImage = data?.idCardImage || "";
    this.profession = data?.profession || "";
    this.isVisitor = utils.objects.isEmpty(data?.isVisitor)
      ? true
      : data!.isVisitor;
    this.optionalData = data?.optionalData
      ? this.parseOptionalData(data!.optionalData)
      : [];
  }
  isEmpty(): boolean {
    if (this.id === "") {
      return true;
    }
    return false;
  }
  parseOptionalData(data: Array<any>): Array<OptionalDataItem> {
    if (!Array.isArray(data)) return [];
    return data.map((item) => {
      try {
        return JSON.parse(item);
      } catch (error) {
        return null;
      }
    });
  }

  exportToUpload(): ResidentTypeType {
    if (this.isVisitor) {
      return {
        name: this.name,
        idCard: this.idCard,
        telegram: this.telegram,
        phone: this.phone,
        profileImage: this.profileImage,
        idCardImage: this.idCardImage,
        optionalData: this.optionalData,
        profession: this.profession,
        isVisitor: this.isVisitor,
      };
    }
    return {
      name: this.name,
      sector: this.sector,
      idCard: this.idCard,
      qr: this.qr,
      telegram: this.telegram,
      phone: this.phone,
      profileImage: this.profileImage,
      idCardImage: this.idCardImage,
      optionalData: this.optionalData,
      profession: this.profession,
      isVisitor: this.isVisitor,
    };
  }
}
export default ResidentType;
