export interface Reward {
  id?: string;
  rewardName: string;
  requiredPoint: number;
  rewardStock: number;
  expiryDate: string;
  rewardDescription: string;
  rewardPicture: File | string;
  vendorID: string;
  stallName: string; 
  category: string;
  campus: string;
}

export interface Vendor {
  id?: string;
  stallName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  password: string;
  idPicture: File | string;
  vendorID: string;
  profilePicture: File | string;
}
