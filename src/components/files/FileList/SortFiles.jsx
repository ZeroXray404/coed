import { ListFilter } from 'lucide-react'
import Dropdown from '../../Dropdown'

function SortFiles({ uid, details, setSortBy }) {
  //   if (!uid) {
  //     console.log('no uid')
  //   } else {
  //     console.log(details[uid])
  //   }

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
      {/* <button
        className="list-row filter-files"
        onClick={() => console.log('TEST')}
        aria-label={`Filter files`}
      >
        <div className="listselect-btn">
          <ListFilter size={14} />
          <span className="list-label">Filter by...</span>
        </div>
      </button> */}

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
