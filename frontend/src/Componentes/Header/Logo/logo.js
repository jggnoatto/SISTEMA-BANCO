import './logo.css'
import logo from '../../../assets/logoMetal.png'
import logoUnbold from '../../../assets/logoMetalUnbold.png'

function Logo () { 
    return (
        <div className="logo">
            <img src={logoUnbold} alt="Logo Metal Bank" />
        </div>
    )
}

export default Logo