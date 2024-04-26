export interface BookingItem {
  coworkingId: string
  coworkingName: string
  bookDate: string
  start: string
  end: string
  
  userId: string
}

export interface CoworkingItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  telephone: string,
  region:string,
  opentime:string,
  closetime:string,
  picture: string,
  __v: number,
  id: string
}

export interface CoworkingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CoworkingItem[]
}

export interface BookingItem2 {
  _id: string
  apptDate: string
  user: string
  coworking: {
                _id: string
                name: string
                province: string
                id: string
              }|null
  start: string
  end: string
  hasReview : string
  createAt: string
  __v: string
}

export interface BookingItemEdit{
  apptDate: string
  start: string
  end: string
}

export interface BookingJson {
  success: boolean,
  count: number,
  data: BookingItem2[]
}

export interface User{
  name:string,
  email:string,
  telephone: string,
  password:string,
  currentPoint?:number
}
export interface UserUpdate{
  name:string,
  email:string,
  telephone: string,
  currentPoint:number
}

export interface CoworkingItemCreate{
  name:string,
  address:string,
  district:string,
  province:string,
  postalcode:string,
  telephone:string,
  region:string,
  opentime:string,
  closetime:string,
  picture:string
}

export interface UserItem {
  _id: string
  name: string
  telephone: string
  email: string
  role: string
  createdAt: string
  currentPoint:number
  __v: 0,
  reservations: UserBookingItem[]
  id: string
}

export interface UserBookingItem {
  _id: string
  apptDate: string
  user: string
  coworking: string
  start: string
  end: string
  createAt: string
  __v: string
}

export interface UserJson {
  success: boolean,
  count: number,
  pagination: {}
  data: UserItem[]
}

export interface HistoryItem {
  _id:string,
  user:string,
  updatedPoint: Number,
  change: string,
  message: string,
  updatedAt: string,
  __v: string
}

export interface HistoryJson {
  success: boolean,
  count: number,
  data: HistoryItem[]
}
export interface ReviewJson {
  success: boolean,
  count: number,
  data: ReviewItem2[]
}

export interface ReviewItem2 {
  data: {
    coworking: {
      _id: string
      name: string
      province: string
      id: string
    }|null
  reservations: UserBookingItem[]
  reservationId: string,
  rating: number,
  comment: string
  }
    
}

export interface ReviewItem {
  reservationId: string,
  rating: Number,
  comment: string
}

export interface ReviewItemEdit {
  
  rating: Number,
  comment: string
}

export interface ApproveItemEdit {
  approval:string
}

export interface ApproveItem{
  _id:string,
  coworking:string,
  reservation:string,
  user:string,
  approval:string,
  rating:number,
  comment:string,
  createdAt:string,
  __v:number
}

export interface ApproveJson{
  success: boolean,
  count: number,
  data: ApproveItem[]
}

export interface ReviewItemCoworking{
  _id: string,
  coworking : string,
  reservation : string,
  user : string,
  approval : string,
  rating : Number,
  comment : string,
  createAt: string
}

export interface ReviewJsonCoworking {
  success: boolean,
  count: number,
  data: ReviewItemCoworking[]
}