import utils from "../libs/utils/utils";

interface GroupTypeType {
  id?: string;
  at: string;
  creationDate: number;
  creator: string;
  name: string;
  public: boolean;
}
class GroupType implements GroupTypeType {
  id: string;
  at: string;
  creationDate: number;
  creator: string;
  name: string;
  public: boolean;
  constructor(id: string, data: GroupTypeType | null) {
    this.id = id;
    this.at = data?.at || "";
    this.creationDate = data?.creationDate || 0;
    this.creator = data?.creator || "";
    this.name = data?.name || "";
    this.public = utils.objects.isEmpty(data?.public) ? false : data!.public;
  }
  isEmpty(): boolean {
    if (this.id !== "" && this.name !== "") {
      return false;
    }
    return true;
  }
  exportToUpload(withId = false) {
    const data: any = {
      at: this.at,
      creationDate: this.creationDate,
      creator: this.creator,
      name: this.name,
      public: this.public,
    };
    if (withId) data.id = this.id;
    return data;
  }
}
export default GroupType;
