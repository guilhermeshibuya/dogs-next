import { Photo } from '@/types/Photo'
import FeedPhotos from './feed-photos'

export default async function Feed({ photos }: { photos: Photo[] }) {
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  )
}
