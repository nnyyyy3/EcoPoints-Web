
export interface Reward {
    id?: string;
    rewardName: string;
    requiredPoint: number;
    rewardStock: number;
    expiryDate: string;
    rewardDescription: string;
    rewardPicture: File | string;
    vendorID: string;
  }
  

  export interface Vendor {
    id?: string;
    displayName: string;
    ownerName: string;
    phoneNumber: string;
    email: string;
    password: string;
    idPicture: File | string;
  }