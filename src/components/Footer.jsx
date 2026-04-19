import { CircleX, Bell, Check, TriangleAlert } from 'lucide-react'

function Footer() {
  return (
    <section className="footer">
      <div className="projectinfo-left">
        <div className="problem-info">
          <CircleX size={24} />
          <input
            onClick={() => alert('ERROR COUNTER')}
            type="button"
            value="0"
          />
        </div>
        <div className="problem-info">
          <TriangleAlert size={24} />
          <input
            onClick={() => alert('WARNING COUNTER')}
            type="button"
            value="0"
          />
        </div>
      </div>
      <div className="copyright-info">
        <p>&copy; ProjFront - Copyright by Team 12</p>
      </div>
      <div className="projectinfo-right">
        <div className="prettier-button">
          <Check size={24} />
          <input
            onClick={() => alert('PRETTIER')}
            type="button"
            value="Prettier"
          />
        </div>
        <button
          onClick={() => alert('NOTIFICATIONS')}
          className="notifications"
        >
          <Bell size={24} />
        </button>
      </div>
    </section>
  )
}

export default Footer
