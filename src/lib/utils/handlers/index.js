import { forms, routes } from '@theme';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createElement, updateElementById } from 'pages/api/global';

const {
  errors: {
    auth: { login },
    //highlight
  },
} = forms.messages;

/**
 * Login form handler
 *
 * @param {Object} data
 * @param {Function} setSubmitting
 * @param {Function} setFieldError
 * @param {route} redirectOnSuccess
 * @returns
 */
export const loginFormHandler = async ({ data, setSubmitting, setFieldError }) => {
  const { identifier, password } = data;

  // Bypass de l'authentification réelle
  if (identifier === 'test' && password === 'test') {
    // Stocker un faux token ou définir l'état comme connecté
    localStorage.setItem('fakeAuthToken', 'fakeToken123');
    window.location.href = '/dashboard'; // Rediriger vers le tableau de bord
  } else {
    setFieldError('identifier', 'Identifiant ou mot de passe incorrect');
  }
  
  setSubmitting(false);
};


export const highlightFormHandler = async ({
  highlighId,
  directionId,
  data,
  setSubmitting,
  closeModal,
  getHightlight,
  setSelectedWeek,
  selectedWeek,
  toast,
}) => {
  const sendData = {
    title: data.title,
    week: data.week?.split('-')[0],
    year: data.week?.split('-')[1],
    textHighlight: data.desc,
    direction: {
      id: directionId,
    },
    status: {
      id: data.status,
    },
  };

  const saveChange = highlighId
    ? updateElementById('v1/highlight', highlighId, sendData, null)
    : createElement('v1/highlight/save', sendData, 'null');
  saveChange
    .then((res) => {
      setSubmitting(false);
      toast({
        title: ` Fait marquant ${
          highlighId ? 'modifier' : 'créer'
        } avec succès`,
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      selectedWeek != data.week ? setSelectedWeek(data.week) : getHightlight();
      closeModal();
    })
    .catch((err) => {
      console.log('ERR ', err);
      setSubmitting(false);
    });
};

export const descFormHandler = async ({
  descId,
  directionId,
  data,
  week,
  setSubmitting,
  closeModal,
  //getHightlight,
  toast,
  goBack,
}) => {
  const sendData = {
    ...data,
    week: week?.split('-')[0],
    year: week?.split('-')[1],
    direction: {
      id: directionId,
    },
  };

  const saveChange = descId
    ? updateElementById('v1/descdata', descId, sendData)
    : createElement('v1/descdata/save', sendData);
  saveChange
    .then((res) => {
      setSubmitting(false);
      toast({
        title: `Valeurs mis à jours avec succès`,
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      //getHightlight();
      console.log('res ', res);
      goBack();
    })
    .catch((err) => {
      console.log('ERR ', err);
      setSubmitting(false);
    });
};
