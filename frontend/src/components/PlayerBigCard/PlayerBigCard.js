import { useState,useEffect} from 'react';
import logo from '../../assets/images/FairPlayLogo.png'
import iconProfile from "../../assets/images/icon-user.png";
import './PlayerBigCard.css'
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';

function PlayerBigCard() {
    const authToken = localStorage.getItem('Authorization');
    const [title, setTitle] = useState('');

    const mensajeDeError = {
        title: "Algo salio mal",
        text: "Por favor, intente nuevamente"
    }

    const mensajeDeExito = {
        title: "¡Tus datos fueron guardados con éxito!",
        text: ""
    }


    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Default Title');
    const [modalText, setModalText] = useState('Default Text');
    const [modalType, setModalType] = useState('success');
    const [profileImage, setProfileImage] = useState(iconProfile);

    const form = useForm({
        defaultValues: {},
        shouldUseNativeValidation: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/usuario/actual', {
                    headers: {
                        'Authorization': authToken,
                    }
                });
                const data = await response.json();
                setTitle(data.userName);
                form.reset(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, [authToken, form]);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch('http://localhost:8080/usuario/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error(response);
                setModalType('error');
                setModalTitle(mensajeDeError.title);
                setModalText(mensajeDeError.text);
                setModalOpen(true);
                throw new Error('Failed to update user');
            }

            console.log('User updated successfully')
            console.log('Success:', data);
            setModalType('success');
            setModalTitle(mensajeDeExito.title);
            setModalText(mensajeDeExito.text);
            setModalOpen(true);
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    const handleImageError = () => {
        setProfileImage(iconProfile);
    };

    useEffect(() => {
        setProfileImage(form.watch("profileImage") || iconProfile);
    }, [form.watch("profileImage")]);

    return (
        <div className="card-box">
            <div className='main-info-section'>
                <div className="photo-section">
                    <img src={profileImage} alt="Profile" className="profile-image-bigcard" onError={handleImageError}/>
                </div>
                <h1 style={{color: '#d1d1d1'}} className="username-title">{title}</h1>
            </div>
            <div className='info'>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='form-field-large'>
                        <p className="info-field large-field">Link de foto de perfil:</p>
                        <input {...form.register("profileImage")} placeholder="https://tuImagen.jpg"/>
                    </div>
                    <div className="form-section">
                        <div className="form-column">
                            <div className='form-field'>
                                <p className="info-field">Usuario de lol:<span className='required-field'> *</span></p>
                                <input {...form.register("lolUser", {required: "Tu usuario de Lol es obligatorio"})} placeholder="Tu user de lol" />
                            </div>
                            <div className='form-field'>
                                <p className="info-field">Rango:</p>
                                <select {...form.register("lolRank")}>
                                    <option value={null}>-</option>
                                    <option value="Iron">Iron</option>
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Platinum">Platinum</option>
                                    <option value="Emerald">Emerald</option>
                                    <option value="Diamond">Diamond</option>
                                    <option value="Master">Master</option>
                                    <option value="Grandmaster">Grandmaster</option>
                                    <option value="Challenger">Challenger</option>
                                </select>
                            </div>
                            <div className='form-field'>
                                <p className="info-field">Horas jugadas:</p>
                                <input {...form.register("hoursPlayed")} placeholder="Tus horas jugadas" />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className='form-field'>
                                <p className="info-field">Región:</p>
                                <select {...form.register("region")}>
                                    <option value={null}>-</option>
                                    <option value="BR">BR</option>
                                    <option value="LAS">LAS</option>
                                    <option value="LAN">LAN</option>
                                    <option value="NA">NA</option>
                                    <option value="EUW">EUW</option>
                                    <option value="EUNE">EUNE</option>
                                    <option value="OCE">OCE</option>
                                    <option value="RU">RU</option>
                                    <option value="TR">TR</option>
                                    <option value="JP">JP</option>
                                    <option value="KR">KR</option>
                                </select>
                            </div>
                            <div className='form-field'>
                                <p className="info-field">Usuario de discord:</p>
                                <input {...form.register("discordUser")} placeholder="Tu user de discord" />
                            </div>
                            <div className='form-field'>
                                <p className="info-field">Roles:</p>
                                <div className="checkbox-row">
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="top"
                                            name="lolRole"
                                            value="TOP"
                                            {...form.register('lolRole')}
                                        />
                                        <label htmlFor="top">Top</label>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="adc"
                                            name="lolRole"
                                            value="ADC"
                                            {...form.register('lolRole')}
                                        />
                                        <label htmlFor="adc">ADC</label>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="mid"
                                            name="lolRole"
                                            value="MID"
                                            {...form.register('lolRole')}
                                        />
                                        <label htmlFor="mid">Mid</label>
                                    </div>
                                </div>
                                <div className="checkbox-row below">
                                <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="jungle"
                                            name="lolRole"
                                            value="JUNGLA"
                                            {...form.register('lolRole')}
                                        />
                                        <label htmlFor="jungle">Jungle</label>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="support"
                                            name="lolRole"
                                            value="SUPPORT"
                                            {...form.register('lolRole')}
                                        />
                                        <label htmlFor="support">Support</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='save-button' type='submit'>Guardar cambios</button>
                </form>
            </div>
            <Modal isOpen={isModalOpen} toggleModal={() => setModalOpen(!isModalOpen)} title={modalTitle} text={modalText} modalType={modalType} />
    </div>
    )
}


export default PlayerBigCard

