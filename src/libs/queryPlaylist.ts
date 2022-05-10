import axios from 'axios'
import dayjs from 'dayjs'
import type { PlaylistItem, PlaylistResult } from '@/types'

// https://developers.google.com/youtube/v3/docs/playlistItems/list
export default function queryPlaylist(
  pageToken: string
): Promise<PlaylistResult> {
  return new Promise((resolve) => {
    ;(async () => {
      try {
        const playlistId = 'PLoiJHOPFy5mUKH4ueyYSjQDUbq1BCpEoo'
        const res = await axios({
          url: 'https://www.googleapis.com/youtube/v3/playlistItems',
          params: {
            part: 'snippet,contentDetails',
            playlistId,
            key: 'AIzaSyDL03DyKv2nXqZiUurlVpEGVt656YOALmU',
            maxResults: 50,
            pageToken,
          },
        })

        const { items, nextPageToken } = res.data
        if (!Array.isArray(items) || !items.length) {
          resolve({
            nextPageToken: nextPageToken || '',
            list: [],
          })
          return
        }

        const list: PlaylistItem[] = items.map((item) => {
          const { contentDetails, snippet } = item
          const { videoPublishedAt } = contentDetails
          const { title, resourceId } = snippet
          const { videoId } = resourceId
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`
          const createTime = dayjs(videoPublishedAt).format(
            'YYYY-MM-DD HH:mm:ss'
          )

          const index = String(title)
            .replace(/皆大歡喜 II/, '')
            .replace(/\(時裝版\)/, '')
            .replace(/\/444.*/, '')

          return {
            index: Number(index),
            title: String(title),
            createTime,
            videoUrl,
          }
        })

        resolve({
          nextPageToken: nextPageToken || '',
          list,
        })
      } catch (e) {
        resolve({
          nextPageToken: '',
          list: [],
        })
      }
    })()
  })
}
