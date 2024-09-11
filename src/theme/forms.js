module.exports = {
  name: 'Theming forms files',
  themeForms: {
    inputs: {
      auth: {
        login: {
          identifier: {
            uid: 'identifier',
            label: 'Identifier',
            placeholder: 'Identifiant',
          },
          password: {
            uid: 'password',
            label: 'Password',
            placeholder: '****************',
            password: true,
            secureTextEntry: true,
          },
          role: {
            uid: 'role',
            label: 'Role',
            placeholder: '',
          },
          submit: {
            uid: 'authentication',
            submit_message: 'Sign in',
          },
          subscribe: {
            uid: 'subscribe',
            submit_message: 'S\'inscrire',
          },
        },
      },
      validation: {
        comment: {
          uid: 'comment',
          label: 'Commentaire',
          placeholder: 'Commentaire',
        },
      },
      highlight: {
        week: {
          uid: 'week',
          label: 'Semaine',
          placeholder: 'Numéro de la semaine',
        },
        title: {
          uid: 'title',
          label: 'Titre',
          placeholder: 'Titre du fait marquant',
        },
        desc: {
          uid: 'desc',
          label: 'Description',
          placeholder: '',
        },
        status: {
          uid: 'status',
          label: 'Status',
          placeholder: 'Status du fait marquant',
        },
        submit: {
          uid: 'submit',
          submit_message: 'Soumettre',
        },
        cancel: {
          uid: 'cancel',
          submit_message: 'Annuler',
        },
      },
      descForm: {
        week: {
          uid: 'week',
          label: 'Semaine',
          placeholder: 'Numéro de la semaine',
        },
        dirValue: {
          uid: 'dirValue',
          label: 'Taux de digital ( DIR )',
          placeholder: 'DIR',
        },
        ibouValue: {
          uid: 'ibouValue',
          label: 'Nom du projet',
          placeholder: '',
        },
        projetValue: {
          uid: 'projetValue',
          label: 'nom du projet',
          placeholder: '',
        },
        currentYearValue: {
          uid: 'currentYearValue',
          label: 'Année en cours',
          placeholder: '',
        },
        associatedMinisterValue: {
          uid: 'associatedMinisterValue',
          label: 'Ministeres associes',
          placeholder: '',
        },
        ownerMinisterValue: {
          uid: 'ownerMinisterValue',
          label: 'Responsable',
          placeholder: '',
        },
        dateMettingValue: {
          uid: 'dateMettingValue',
          label: 'Date de rencontre',
          placeholder: '',
        },
        codeMettingValue: {
          uid: 'codeMettingValue',
          label: 'Code de rencontre',
          placeholder: '',
        },
        typeMettingValue: {
          uid: 'typeMettingValue',
          label: 'Type de rencontre',
          placeholder: '',
        },
        mettingValue: {
          uid: 'mettingValue',
          labelArea: 'Rencontre',
          placeholder: '',
        },
        codeDirectiveValue: {
          uid: 'codeDirectiveValue',
          label: 'Code de directive',
          placeholder: '',
        },
        typeDirectiveValue: {
          uid: 'typeDirectiveValue',
          label: 'Type de directive',
          placeholder: '',
        },
        directiveValue: {
          uid: 'directiveValue',
          labelArea: 'Directive',
          placeholder: '',
        },
        startRealDateValue: {
          uid: 'startRealDateValue',
          label: 'Date de debut reelle',
          placeholder: '',
        },
        endRealDateValue: {
          uid: 'endRealDateValue',
          label: 'Date de fin reelle',
          placeholder: '',
        },
        limitDateValue: {
          uid: 'limitDateValue',
          label: 'Date limite',
          placeholder: '',
        },
        previousLimitDateValue: {
          uid: 'previousLimitDateValue',
          label: 'Date limite prevue',
          placeholder: 'mm/dd/yy',
        },
        stateValue: {
          uid: 'stateValue',
          label: 'Etat d\'avancement',
          placeholder: '',
        },
        budgetProject: {
          uid: 'budgetProject',
          label: 'budget',
          placeholder: '',
        },
        dureeProject: {
          uid: 'dureeProject',
          label: 'durée',
          placeholder: '',
        },
        ownerProject: {
          uid: 'ownerProject',
          label: 'responsable projet',
          placeholder: '',
        }, 
        orangeMoneyValue: {
          uid: 'orangeMoneyValue',
          label: 'Orange Money',
          placeholder: '',
        },
        portalValue: {
          uid: 'portalValue',
          label: 'Portail',
          placeholder: '',
        },
        eannuaireValue: {
          uid: 'eannuaireValue',
          label: 'E-annuaire',
          placeholder: '',
        },
        chatbotValue: {
          uid: 'chatbotValue',
          label: 'Chatbot',
          placeholder: '',
        },

        evitementSelfcareValue: {
          uid: 'evitementSelfcareValue',
          label: 'Evitement Selfcare',
          placeholder: '',
        },
        csatValue: {
          uid: 'csatValue',
          label: 'CSAT',
          placeholder: '',
        },
        dsatValue: {
          uid: 'dsatValue',
          label: 'DSAT',
          placeholder: '',
        },
        serviceLevelValue: {
          uid: 'serviceLevelValue',
          label: 'Service Level',
          placeholder: '',
        },
        timeCycleValue: {
          uid: 'timeCycleValue',
          label: 'Temps de Cycle',
          placeholder: '',
        },
        rateAbandonValue: {
          uid: 'rateAbandonValue',
          label: "Taux d'abandon",
          placeholder: '',
        },
        npsValue: {
          uid: 'npsValue',
          label: 'NPS',
          placeholder: '',
        },
        cesValue: {
          uid: 'cesValue',
          label: 'CES',
          placeholder: '',
        },
        trValue: {
          uid: 'trValue',
          label: 'TR',
          placeholder: '',
        },
        caRebondValue: {
          uid: 'caRebondValue',
          label: 'CA Rebond',
          placeholder: '',
        },
        fcrValue: {
          uid: 'fcrValue',
          label: 'FCR',
          placeholder: '',
        },
        submit: {
          uid: 'submit',
          submit_message: 'Soumettre',
        },
        cancel: {
          uid: 'cancel',
          submit_message: 'Annuler',
        },
      },
      search: {
        keyword: {
          uid: 'keyword',
          placeholder: 'Recherchez ici',
        },
        submit: {
          uid: 'searchSubmition',
          submit_message: 'Recherchez',
        },
      },
    },
    messages: {
      errors: {
        auth: {
          login: {
            not_authorized: 'Identifier or Password invalid',
          },
        },
        highlight: {
          request_err: 'Error when saving highlight',
        },
      },
      infos: {},
    },
  },
};
