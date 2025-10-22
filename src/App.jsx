import BabylonScene from './components/BabylonScene'
import './App.css'

function App() {
  return (
    <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '15px',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
          Laberinto 3D - EPN
        </h1>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          Usa WASD o flechas para moverte
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          Clic y arrastra para mirar alrededor
        </p>
      </div>
      <BabylonScene />
    </div>
  )
}

export default App
