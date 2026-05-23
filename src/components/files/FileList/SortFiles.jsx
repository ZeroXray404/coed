import { ListFilter } from 'lucide-react'
import Dropdown from '../../Dropdown'

function SortFiles({ uid, details, setSortBy }) {
  if (details[uid].files.length < 2) {
    return
  }

  // const projectFiles = details[uid].files

  // for (let i = 0; i < projectFiles.length; i++) {
  //   console.log(projectFiles[i].filename)

  //   console.log(getFileType(projectFiles[i]))
  // }

  // console.log(getFileName(projectFiles.filename))

  const choices = {
    data: [
      {
        uid: 'filename',
        name: 'Title',
      },
      {
        uid: 'last_changed',
        name: 'Modified',
      },
      {
        uid: 'created_by',
        name: 'Creator',
      },
      {
        uid: 'language',
        name: 'Language',
      },
    ],
  }

  function getSortId(choiceId) {
    setSortBy(choiceId)
  }

  return (
    <li className="sort-files">
      <div className="sort-files-icon">
        <ListFilter size={14} />
      </div>

      <Dropdown
        buttonText="Sort by..."
        dataObj={choices.data}
        hasDefaultOption={false}
        getIdHandler={getSortId}
      />
    </li>
  )
}

export default SortFiles
