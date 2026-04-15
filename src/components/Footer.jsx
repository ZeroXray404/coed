import { CircleX, Bell, Check, TriangleAlert } from 'lucide-react'

function Footer() {
  return (
    <section className="footer">
      <div className="projectinfo-left">
        <button
          onClick={() => alert('USER-PROFILE')}
          className="prettier-button"
        >
          <CircleX size={24} />
          <div>
            <input
              className="footer-text"
              onClick={() => alert('LOGIN')}
              type="button"
              value="0"
            />
          </div>
          <TriangleAlert size={24} />
          <div>
            <input
              className="footer-text"
              onClick={() => alert('LOGIN')}
              type="button"
              value="0"
            />
          </div>
        </button>
      </div>
      <div className="copyright-info">
        <p>&copy; ProjFront - Copyright by Team 12</p>
      </div>
      <div className="projectinfo-right">
        <button
          onClick={() => alert('USER-PROFILE')}
          className="prettier-button"
        >
          <Check size={24} />
          <div>
            <input
              className="footer-text"
              onClick={() => alert('LOGIN')}
              type="button"
              value="Prettier"
            />
          </div>
        </button>
        <button onClick={() => alert('USER-PROFILE')} className="user">
          <Bell size={24} />
        </button>
      </div>
    </section>
  )
}

export default Footer
