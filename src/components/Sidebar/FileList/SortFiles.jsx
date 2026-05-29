import { ListFilter, ArrowUpZA, ArrowDownAZ } from 'lucide-react'
import Dropdown from '../../Dropdown'

function SortFiles({ uid, details, sortBy, setSortBy, sortDir, setSortDir }) {
  if (details[uid].files.length < 2) {
    return
  }

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

  function handleSort(newSortBy) {
    if (sortBy === newSortBy) {
      handleOrder()
    } else {
      setSortBy(newSortBy)
      // setSortDir('Desc')
    }
  }

  function handleOrder() {
    setSortDir((prev) => (prev === 'Asc' ? 'Desc' : 'Asc'))
  }

  function getSortId(choiceId) {
    handleSort(choiceId)
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

      <button
        className="sort-files-order"
        onClick={handleOrder}
        aria-label={`Changes order of files (${sortDir})`}
      >
        {sortDir === 'Asc' ? (
          <ArrowUpZA size={16} />
        ) : (
          <ArrowDownAZ size={16} />
        )}
      </button>
    </li>
  )
}

export default SortFiles
