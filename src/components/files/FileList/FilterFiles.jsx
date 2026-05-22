import { ListFilter } from 'lucide-react'
import Dropdown from '../../Dropdown'

function FilterFiles({ uid, details, setFilterBy }) {
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

  function getFilterId(choiceId) {
    setFilterBy(choiceId)
  }

  return (
    <div className="filter-files">
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

      <Dropdown
        buttonText="Filter by..."
        dataObj={choices.data}
        hasDefaultOption={false}
        getIdHandler={getFilterId}
      />
    </div>
  )
}

export default FilterFiles
