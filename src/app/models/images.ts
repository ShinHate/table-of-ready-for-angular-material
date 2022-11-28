export interface IImages {
  id?: string
  name: string
  width: number
  height: number
  angle: number
  colors: any
  tags: {
    COLORS: [
      {
        code: string
        meta: string
        name: string
        published?: boolean
      }
    ]
  }
  images: {
    S: {
      src: string
    }
    M: {
      src: string
    }
    L: {
      src: string
    }
  },
  uploadTime: string
  published: boolean
}
