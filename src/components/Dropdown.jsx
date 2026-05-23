import { useEffect, useRef, useState } from 'react'
import DropdownBtn from './Dropdown/DropdownBtn'
import DropdownContent from './Dropdown/DropdownContent'
import DropdownItem from './Dropdown/DropdownItem'

function Dropdown({
  buttonText,
  dataObj,
  dataName = 'name',
  dataId = 'uid',
  hasDefaultOption = true,
  getIdHandler,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState('')
  const [selectedItemId, setSelectedItemId] = useState('')

  const dropdownRef = useRef(null)

  function toggleDropdown() {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isOpen])

  function handleItemSelect(valueFromItemName, valueFromItemId) {
    setSelectedItemName(valueFromItemName)
    setSelectedItemId(valueFromItemId)
    setIsOpen(false)

    getIdHandler(valueFromItemId)
    console.log(`previous id: ${selectedItemId}`)
  }

  if (!dataObj) {
    return
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownBtn openState={isOpen} toggleFunc={toggleDropdown}>
        {!selectedItemName ? buttonText : selectedItemName}
      </DropdownBtn>
      <DropdownContent openState={isOpen}>
        {
          <>
            {hasDefaultOption && (
              <DropdownItem
                itemId="none"
                itemName=""
                onItemSelect={handleItemSelect}
              >
                None
              </DropdownItem>
            )}

            {dataObj.map((item) => (
              <DropdownItem
                key={item[dataId]}
                itemId={item[dataId]}
                itemName={item[dataName]}
                onItemSelect={handleItemSelect}
              >
                {item[dataName]}
              </DropdownItem>
            ))}
          </>
        }
      </DropdownContent>
    </div>
  )
}

export default Dropdown
