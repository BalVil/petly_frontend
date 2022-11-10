import { useState } from 'react';

import UserDataItem from './UserDataItem/UserDataItem';

import camera from '../../image/camera.png';
import doneVector from '../../image/doneVector.png';

import styles from './UserData.module.scss';

function UserData() {
  const [fileValue, setFileValue] = useState([]);
  const [picture, setPicture] = useState('');
  const [active, setActive] = useState(true);

  const boolButton = e => {
    e.preventDefault();

    if (active === true) {
      setActive(false);
      return;
    }

    setActive(true);
  };

  const handleChange = e => {
    setFileValue(e.target.files[0]);

    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64data = reader.result;
        setPicture(base64data);
      };
    }
  };

  return (
    <div>
      <h2 className={styles.title}>My information:</h2>
      <div className={styles.userInformation}>
        <form id="form" encType="multipart/form-data">
          <div className={styles.field__wrapper}>
            <label className={styles.field__lable}>
              <input
                className={styles.field__file}
                type="file"
                name="file"
                accept="image/*, image/jpeg, image/jpg"
                required
                multiple
                onChange={handleChange}
                disabled={active}
              />
              <div
                className={`${styles.field__fake} ${
                  !active && !picture ? styles.pointer : ''
                }`}
              >
                {picture ? (
                  <img
                    className={styles.image}
                    src={picture}
                    alt={fileValue?.name}
                  />
                ) : active ? (
                  'Upload your photo'
                ) : (
                  'Choise your photo'
                )}
              </div>
              {picture && !active && (
                <div className={`${styles.anyChoise}`}>Choise your photo</div>
              )}
            </label>
            <button
              className={`${styles.buttonPhoto} ${
                active ? '' : styles.buttonDone
              }`}
              onClick={boolButton}
            >
              {active ? (
                <>
                  <img
                    className={styles.imageCamera}
                    src={camera}
                    alt="camera"
                  />
                  Edit photo
                </>
              ) : (
                <img
                  className={styles.imageDone}
                  src={doneVector}
                  alt="doneVector"
                ></img>
              )}
            </button>
          </div>
        </form>
        <ul className={styles.list}>
          <UserDataItem
            title={'Name'}
            pattern={
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
            }
            type={'text'}
            placeholder={'Name'}
            min={2}
            max={48}
            required={true}
          />
          <UserDataItem
            title={'Email'}
            pattern={
              /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            }
            type={'email'}
            placeholder={'example@gmail.com'}
          />
          <UserDataItem
            title={'Birthday'}
            pattern={
              /(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\d\d)$/
            }
            type={'text'}
            placeholder={'DD.MM.YYYY'}
          />
        </ul>
      </div>
    </div>
  );
}

export default UserData;
