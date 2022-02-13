import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import aty from './assets/aty.mp3';
import loading from './assets/loading200.gif';
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
import play from './assets/play.png';
import pause from './assets/pause.png';
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
  const [enter, setEnter] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [inviteCount, setInviteCount] = useState(1);
  const [inviteData, setInviteData] = useState({});
  const [confirmacionOk, setConfirmacionOk] = useState(false);
  const [timeLeft, setTimeLeft] = useState([0, 0, 0]);
  const [playing, setPlaying] = useState(false);
  let content;

  useEffect(() => {
    //get invite count
    setInviteCount(getInviteCountFromQuery());
    //get countdown
    setTimeLeft(getCountdown());
    //preload images
    const imageList = [img1, img2, horas1, horas2, horas3, info1, info2, info3, carousel1, carousel2, carousel3, carousel4, confirmacion, despedida];
    imageList.forEach((image) => {
      new Image().src = image;
    });
    setTimeout(() => {
      setInitialLoad(true);
    }, 2000);

  }, []); // eslint-disable-line

  const sendEmail = (body, callback) => {
    if(window.Email) {
      window.Email.send({
        Host: "smtp.gmail.com",
        Username: "wedd.dani.jorge@gmail.com",
        Password: "marriott0322",
        To: 'danirojas13.07@gmail.com',
        From: "wedd.dani.jorge@gmail.com",
        Subject: "Wedding confirmation!",
        Body: body,
      })
        .then(function (message) {
          callback();
          console.log('||--message', message);
        });
    } 
  };

  const editName = (i, e) => {
    let data = inviteData;
    if(data['invite'+i]){
      data['invite'+i].name = e.target.value;
    }else{
      data['invite'+i] = {name: e.target.value, ced: ''};
    }
    setInviteData(data);
  };

  const editCed = (i, e) => {
    let data = inviteData;
    if(data['invite'+i]){
      data['invite'+i].ced = e.target.value;
    }else{
      data['invite'+i] = {name: '', ced: e.target.value};
    }
    setInviteData(data);
  };

  const submitInvites = () => {
    if(inviteData !== {}) {
      let body = 'Lista confirmados a la boda:<br /><br />';
      Object.entries(inviteData).forEach(entry => {
        const [key, invite] = entry;
        body += 'Nombre: ' + invite.name + '<br />';
        body += 'Cedula: ' + invite.ced + '<br />';
      });
      body += '<br />--------------------';
      sendEmail(body, () => {
        setConfirmacionOk(true);
      });
    } 
  };

  const renderInviteFields = () => {
    let elements = [];
    for(let i = 0; i < inviteCount; i++){
      elements.push(
        <li style={{display: 'flex', flexDirection: 'column', paddingBottom: 16}}>
          <input type="text" className="input-confirm" name={'invite-name-'+i} placeholder={'Nombre completo '+(i+1)} onChange={(e) => { editName(i, e)}} style={{marginBottom: 4, fontFamily: 'MontserratExtraLight'}}/>
          <input type="text" className="input-confirm" name={'invite-name-'+i} placeholder={'Número de cédula '+(i+1)} onChange={(e) => { editCed(i, e)}} style={{fontFamily: 'MontserratExtraLight'}}  />
        </li>
      );
    }
    return elements;
  };

  const playAudio = () => {
    const song = document.getElementById('song'); 
    song.play(); 
    setPlaying(true);
  };

  const pauseAudio = () => {
    const song = document.getElementById('song'); 
    song.pause(); 
    setPlaying(false);
  };

  const toggleAudio = () => {
    if(playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const enterInvite = () => {
    setEnter(true);
    playAudio();
    setTimeout(() => {
      setFadeIn(true);
    }, 200);
  };

  if(!initialLoad) {
    content = (
      <div className="App-loading">
        <img src={loading} alt="Loading..." style={{width: '30%', display: 'block', margin: '90px auto 0 auto'}} />
      </div>
    );
  }

  if(initialLoad && !enter) {
    content = (
      <div className="App-loading">
        <h1 style={{fontFamily: 'Playfair', color: '#706F6F', paddingTop: 100}}>DANI &<br />JORGE</h1>
        <button className="enter-button" onClick={enterInvite}>Entrar</button>
      </div>
    );
  }

  if(initialLoad && enter) {
    content = (
      <div className={`App ${fadeIn ? 'fadeIn' : ''}`}>
        <div className="intro">
          <img src={img1} alt="Dani y Jorge" style={{width: '100%', display: 'block'}} />
          <img src={img2} alt="Dani y Jorge" style={{width: '100%', display: 'block'}} />
          <button onClick={toggleAudio} type="button" className={`playsong ${playing ? 'playing' : ''}`}>
            {playing ? 
              <img src={pause} alt="pause" style={{width: 16, height: 16}} /> 
              : 
              <img src={play} alt="play" style={{width: 16, height: 16}} />
            }
          </button>
          <p style={{fontFamily: 'PetitFormalScript', fontSize: '17px', color: '#706F6F', width: '90%', margin: '20px auto'}}>"Nos complace que seas<br />parte de esta nueva etapa<br />de nuestras vidas,<br />esperamos que nos puedan<br />acompañar en este día<br />tan especial"</p>
        </div>
        <div className="horas" style={{paddingTop: '50px'}}>
          <img src={horas1} alt=" " style={{width: '8%', display: 'block', marginLeft: '70%'}} />
          <div className="counter" style={{display: 'flex', justifyContent: 'center', color: '#706F6F', paddingBottom: 24}}>
            <div className="months">
              <div style={{fontFamily: 'MontserratExtraLight', paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[0]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>MESES</div>
            </div>
            <div className="days" style={{padding: '0 22px'}}>
              <div style={{fontFamily: 'MontserratExtraLight', paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[1]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>DÍAS</div>
            </div>
            <div className="hours">
              <div style={{fontFamily: 'MontserratExtraLight', paddingBottom: '10px', fontSize: '36px'}}>{("0" + timeLeft[2]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>HORAS</div>
            </div>
          </div>
          <img src={horas2} alt=" " style={{width: '100%', display: 'block'}} />
          <img src={horas3} alt=" " style={{width: '100%', display: 'block'}} />
        </div>
        <div className="info" style={{position: 'relative'}}>
          <img src={info1} alt="Dani y Jorge" style={{width: '42%', display: 'block', margin: '50px auto 0 auto'}} />
          <h2 style={{fontFamily: 'Playfair', color: '#706F6F', paddingTop: 26, fontSize: 16, fontWeight: 400}}>CEREMONIA & RECEPCIÓN</h2>
          <div className="dat-time" style={{display: 'flex', justifyContent: 'center', color: '#706F6F', fontFamily: 'Playfair', paddingTop: 6}}>
            <div>
              <div style={{fontSize: '36px', lineHeight: '26px'}}>20</div>
            </div>
            <div className="days" style={{padding: '0 16px', margin: '0 13px', border: '1px solid #706F6F', borderTop: 'none', borderBottom: 'none'}}>
              <div style={{fontSize: '16px'}}>Marzo</div>
              <div style={{fontSize: '13px', lineHeight: '11px'}}>2:00pm</div>
            </div>
            <div>
              <div style={{fontSize: '36px', lineHeight: '26px'}}>22</div>
            </div>
          </div>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, paddingTop: 18, marginBottom: 0, lineHeight: '4px'}}>Marriott Hotel Hacienda Belén</p>
          <a 
            style={{fontFamily: 'MontserratExtraLight', fontSize: '10px'}}
            href="https://www.google.com/maps/place/Costa+Rica+Marriott+Hotel+Hacienda+Belen/@9.9872377,-84.1757531,17z/data=!3m1!4b1!4m8!3m7!1s0x8fa0fa32f22d8ef5:0xa2e125b9e9634d7c!5m2!4m1!1i2!8m2!3d9.9872377!4d-84.1735644"
            target="_blank"
          >
            Ver ubicación aquí
          </a>
          <h2 style={{fontFamily: 'Playfair', color: '#706F6F', paddingTop: 36, fontSize: 16, fontWeight: 400}}>CÓDIGO DE VESTIMENTA</h2>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, paddingTop: 4, marginBottom: 0, lineHeight: '8px'}}>Vestimenta formal</p>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 9, marginBottom: 0, lineHeight: '4px'}}>No recomendable tacón aguja</p>
          <h2 style={{fontFamily: 'Playfair', color: '#706F6F', paddingTop: 36, fontSize: 16, fontWeight: 400}}>OBSEQUIOS</h2>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, marginBottom: 0, lineHeight: '20px', paddingBottom: 8}}>
            Nuestro mayor regalo será<br />
            su compañía, en este día tan especial.<br />
            Pero si desean hacernos un obsequio,<br />
            aceptamos las muestras de cariño en efectivo.<br />
            Pueden colocar su presente en un sobre<br />
            y depositarlo en un buzón el día de la boda,<br />
            o también a nuestros números de cuenta.<br />
          </p>
          <div>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 10, fontWeight: 600, color: '#706F6F', marginBottom: 0}}>
              IBAN BAC COLONES
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, fontWeight: 600, color: '#706F6F', marginBottom: 0, marginTop: 0}}>
              CR50010200009499106996
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, color: '#706F6F', marginTop: 2, marginBottom: 0}}>
              Daniela Rojas Cascante
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 10, color: '#706F6F', marginTop: 2, marginTop: 0}}>
              ced. 207300580
            </p>
          </div>
          <div style={{paddingBottom: 48, paddingTop: 4}}>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 10, fontWeight: 600, color: '#706F6F', marginBottom: 0}}>
              IBAN BAC DÓLARES
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, fontWeight: 600, color: '#706F6F', marginBottom: 0, marginTop: 0}}>
              CR16010200009483617387
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, color: '#706F6F', marginTop: 2, marginBottom: 0}}>
              Jorge Esteban Quirós Arce
            </p>
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 10, color: '#706F6F', marginTop: 2, marginTop: 0}}>
              ced. 114760952
            </p>
          </div>
          <img src={info2} alt=" " style={{width: '26%', display: 'block', position: 'absolute', right: 0, top: '-12px'}} />
          <img src={info3} alt=" " style={{width: '22%', display: 'block', position: 'absolute', left: 0, bottom: '23%'}} />
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
        <div className="confirmacion" style={{color: '#FFFFFF', backgroundColor: '#000000', backgroundImage: `url('${process.env.PUBLIC_URL}/confirmacion.jpg')`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat'}}>
          <h2 style={{marginTop: 0, fontFamily: 'Playfair', paddingTop: 17, fontSize: 15, marginBottom: 2}}>CONFIRMAR ASISTENCIA</h2>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 11, marginTop: 8}}>Para el descanso de los niños y el disfrute<br />de los padres, este evento será solo para adultos.</p>
          <ul style={{padding: 0, width: '70%', margin: '0 auto'}}>
            {renderInviteFields()}
          </ul>
          {!confirmacionOk && 
            <button className="confirm-button" onClick={submitInvites}>Confirmar</button>
          }
          {confirmacionOk && 
            <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12}}>Confirmación enviada. Gracias!</p>
          }
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12,  marginBottom: 0}}>Confirmar asistencia antes del 20 de Febrero.</p>
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, marginTop: 6, paddingBottom: 30}}><strong>whatsapp:</strong> Dani 88842373 · Jorge 86816085</p>
        </div>
        <div className="despedida">
          <p style={{fontFamily: 'MontserratExtraLight', fontSize: 12, color: '#706F6F', marginTop: 22, lineHeight: '18px'}}>Por órdenes de la administración se solicitará<br />código QR o Carné de vacunación en recepción.</p>
          <img src={despedida} alt="Daniela y Jorge" style={{width: '60%', display: 'block', margin: '10px auto 14px auto'}} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <audio autoPlay id="song">
        <source src={aty} type="audio/mpeg" />
      </audio>
      {content}
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

// LISTO: QR codes, 1,2,3,4,5,6

// LISTO: MESES DIAS HORAS  ----> 20 marzo, 1pm  (1647802800)

// LISTO: ver ubicación =>

// LISTO: buscar carousel

// formulario





