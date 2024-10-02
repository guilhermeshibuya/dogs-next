import { Comment } from './comment'
import { Photo } from './photo'

export type PhotoData = {
  photo: Photo
  comments: Comment[]
}
