import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.png';
import horas1 from './assets/horas1.png';
import horas2 from './assets/horas2.png';
import horas3 from './assets/horas3.jpg';
import info1 from './assets/info1.png';
import info2 from './assets/info2.png';
import info3 from './assets/info3.png';
import carousel1 from './assets/carousel1.jpg';
import carousel2 from './assets/carousel2.jpg';
import carousel3 from './assets/carousel3.jpg';
import carousel4 from './assets/carousel4.jpg';
import confirmacion from './assets/confirmacion.jpg';
import despedida from './assets/despedida.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';

const getInviteCountFromQuery = () => {
  let pair;
  let count = 1;
  if(window.location.search) {
    const query = window.location.search.substring(1);
    const params = query.split('&');
    params.forEach(param => {
      pair = param.split('=');
      if(pair[0] && pair[0] === 'i') {
        count = pair[1] && parseInt(pair[1]);
      }
    });
  }
  return (count >= 2 && count <= 6) ? count : 1;
};

const getCountdown = () => {
  const hour = 3600;
  const day = hour *  24;
  const month = day * 30;
  const wedd = 1647802800;
  const now = Math.floor(Date.now() / 1000);
  let totalLeft = 1647802800 - now;
  const monthLeft = Math.floor(totalLeft / month);
  totalLeft = totalLeft - (monthLeft * month);
  const dayLeft = Math.floor(totalLeft / day);
  totalLeft = totalLeft - (dayLeft * day);
  const hourLeft = Math.floor(totalLeft / hour);
  return [monthLeft, dayLeft, hourLeft];
};

function App() {
  const [inviteCount, setInviteCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState([0, 0, 0]);

  useEffect(() => {
    //get invite count
    setInviteCount(getInviteCountFromQuery());
    //get countdown
    setTimeLeft(getCountdown());
    //preload images
    const imageList = [img1, img2, horas1, horas2, horas3, info1, info2, info3, carousel1, carousel2, carousel3, carousel4, confirmacion, despedida];
    imageList.forEach((image) => {
      new Image().src = image
      console.log('||--loading image');
    });
  }, []); // eslint-disable-line

  const sendEmail = () => {
    console.log('||--send email');
    if(window.Email) {
      window.Email.send({
        Host: "smtp.gmail.com",
        Username: "wedd.dani.jorge@gmail.com",
        Password: "marriott0322",
        To: 'gcsebas99@gmail.com',
        From: "wedd.dani.jorge@gmail.com",
        Subject: "Wedding confirmation!",
        Body: "Sebastian G 1-1367-0272",
      })
        .then(function (message) {
          console.log('||--message', message);
        });
    } 
  };

  return (
    <div className="App">
      <div className="intro">
        <img src={img1} alt="Dani y Jorge" style={{width: '100%', display: 'block'}} />
        <img src={img2} alt="Dani y Jorge" style={{width: '100%', display: 'block'}} />
        <p style={{fontFamily: 'PetitFormalScript', fontSize: '17px', color: '#706F6F', width: '90%', margin: '20px auto'}}>"Nos complace que seas<br />parte de esta nueva etapa<br />de nuestras vidas,<br />esperamos que nos puedan<br />acompañar en este día<br />tan especial"</p>
      </div>
      <div className="horas" style={{paddingTop: '50px'}}>
        <img src={horas1} alt=" " style={{width: '8%', display: 'block', marginLeft: '70%'}} />
        <div className="counter" style={{display: 'flex', justifyContent: 'center', color: '#706F6F'}}>
          <div className="months">
            <div style={{paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[0]).slice(-2)}</div>
            <div>MESES</div>
          </div>
          <div className="days" style={{padding: '0 22px'}}>
            <div style={{paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[1]).slice(-2)}</div>
            <div>DÍAS</div>
          </div>
          <div className="hours">
            <div style={{paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[2]).slice(-2)}</div>
            <div>HORAS</div>
          </div>
        </div>
        <img src={horas2} alt=" " style={{width: '100%', display: 'block'}} />
        <img src={horas3} alt=" " style={{width: '100%', display: 'block'}} />
      </div>
      <div className="info" style={{position: 'relative'}}>
        <img src={info1} alt="Dani y Jorge" style={{width: '42%', display: 'block', margin: '50px auto 0 auto'}} />
        <h2>CEREMONIA & RECEPCIÓN</h2>
        <div className="dat-time" style={{display: 'flex', justifyContent: 'center', color: '#706F6F'}}>
          <div>
            <div style={{fontSize: '36px'}}>20</div>
          </div>
          <div className="days" style={{padding: '0 22px'}}>
            <div style={{paddingBottom: '10px', fontSize: '20px'}}>Marzo</div>
            <div>2:00pm</div>
          </div>
          <div>
            <div style={{fontSize: '36px'}}>22</div>
          </div>
        </div>
        <p>Marriott Hotel Hacienda Belén</p>
        <a 
          href="https://www.google.com/maps/place/Costa+Rica+Marriott+Hotel+Hacienda+Belen/@9.9872377,-84.1757531,17z/data=!3m1!4b1!4m8!3m7!1s0x8fa0fa32f22d8ef5:0xa2e125b9e9634d7c!5m2!4m1!1i2!8m2!3d9.9872377!4d-84.1735644"
          target="_blank"
        >
          Ver ubicación aquí
        </a>
        <h2>CÓDIGO DE VESTIMENTA</h2>
        <p>Vestimenta formal</p>
        <p>No recomendable tacón aguja</p>
        <h2>OBSEQUIOS</h2>
        <p>Nuestro mayor regalo es la compañía,<br />pero si desea hacernos un obsequio.</p>
        <p>Daniela Rojas Cascante</p>
        <p>Cuenta BAC CR 12345678901234567</p>
        <img src={info2} alt=" " style={{width: '26%', display: 'block', position: 'absolute', right: 0, top: '-12px'}} />
        <img src={info3} alt=" " style={{width: '22%', display: 'block', position: 'absolute', left: 0, bottom: '0px'}} />
      </div>
      <div className="galeria" style={{marginBottom: 6}}>
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          interval={3500}
        >
          <div>
              <img src={carousel1} alt=" " />
          </div>
          <div>
              <img src={carousel2} alt=" " />
          </div>
          <div>
              <img src={carousel3} alt=" " />
          </div>
          <div>
              <img src={carousel4} alt=" " />
          </div>
        </Carousel>
      </div>
      <div className="confirmacion" style={{position: 'relative', color: '#FFFFFF'}}>
        <img src={confirmacion} alt=" " style={{width: '100%', display: 'block', position: 'absolute', left: 0, top: 0, zIndex: '-1'}} />
        <h2 style={{marginTop: 0}}>CONFIRMAR ASISTENCIA</h2>
        <p>Para el descanso de los niños y el disfrute<br />de los padres, este evento será solo para adultos.</p>
        <p>Confirmar asistencia antes del 20 de Febrero.</p>
        <p><strong>whatsapp:</strong> Dani 88842373 · Jorge 86816085</p>
        <br />
        INVITES: {inviteCount}
      </div>
      <div className="despedida">
        <p>Por órdenes de la administración se solicitará<br />código QR o Carné de vacunación en recepción.</p>
        <img src={despedida} alt="Daniela y Jorge" style={{width: '60%', display: 'block', margin: '10px auto 14px auto'}} />
      </div>
    </div>
  );
}

export default App;

// <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Boda de Dani y Jorge!
//         </p>
//         <form method="post">
//           <input type="button" value="Send Email Please" 
//               onClick={sendEmail} />
//         </form>
//       </header>

// QR codes, 1,2,3,4,5,6

// LISTO: MESES DIAS HORAS  ----> 20 marzo, 1pm  (1647802800)

// LISTO: ver ubicación =>

// buscar carousel

// formulario





