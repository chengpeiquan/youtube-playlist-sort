export interface PlaylistItem {
  index: number
  title: string
  videoUrl: string
  createTime: string
}

export interface PlaylistResult {
  nextPageToken: string
  list: PlaylistItem[]
}
