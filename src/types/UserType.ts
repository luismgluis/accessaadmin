type UserTypeType = {
  id?: string;
  name: string;
  lastName?: string;
  email: string;
  nickname: string;
  profileImage?: string;
  profileImageKey?: string;
  creationDate: number;
};

class UserType {
  id: string;
  name: string;
  lastName: string;
  email: string;
  nickname: string;
  profileImage: string;
  profileImageKey: string;
  creationDate: number;
  constructor(id: string, data: UserTypeType | null) {
    this.id = id;
    this.name = data?.name || "";
    this.lastName = data?.lastName || "";
    this.email = data?.email || "";
    this.profileImage = data?.profileImage || "";
    this.nickname = data?.nickname || "";
    this.profileImageKey = data?.profileImageKey || "";
    this.creationDate = data?.creationDate || 0;
  }
  isEmpty() {
    if (this.id === "") return true;
    return false;
  }
  exportToUpload() {
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      profileImage: this.profileImage,
      profileImageKey: this.profileImageKey,
      nickname: this.nickname,
      creationDate: this.creationDate,
    };
  }
}
export default UserType;
