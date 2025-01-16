'use client'

import styles from './addPost.module.css'
import Editor from '@/components/markdownEditor/markdownEditor'

const AddPost = () => {

  return (
    <div className={styles.container}>
      <h2>Write Your Post</h2>
      <br></br>
      <Editor></Editor>
    </div>
  )
}

export default AddPost