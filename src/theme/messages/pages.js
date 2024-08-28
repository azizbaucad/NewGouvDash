module.exports = {
  name: 'Pages Messages',
  themePagesMessages: {
    login: {
      heading: {
        title: 'Bienvenue à Gouv\'Dash',
        subtitle: 'Vos données à portée de main',
      },
      specifics: {
        forgotten_password: 'Forgot password?',
        account: "Don't have an account? Sign up",
        highlight: 'Sign up',
      },
      errors: {
        phone: 'Veuillez mettre un numéro valide',
        password: 'Veuillez renseigner le mot de passe',
        password_confirmation: 'Veuillez renseigner le mot de passe',
        not_authorized: 'Identifier or Password invalid',
      },
    },
    dashboard: {
      initial: {
        title: 'Monthly activities',
      },
      reporting: {
        title: 'Reporting 📜',
      },
      applications: {
        title: 'Application Management 🏗️🏭',
        new_application: 'New application',
        no_application: {
          title: 'There is nothing to see Here 😕',
          subtitle: 'Please create a new application by clicking on the button',
          new: 'Create application',
        },
        new: {
          title: 'Create new application',
        },
        update: {
          title: 'Edit {appname}',
        },
        view: {
          title: 'View application',
          apiProduct: {
            applicationApi: 'APIs selected',
          },
          description: 'Description',
          creds: 'Credentials',
          cred_id: {
            name: 'client_id',
            display: 'Client ID:',
          },
          cred_secret: {
            name: 'client_secret',
            display: 'Client secret:',
          },
          dangerZone: {
            updateCta: 'Update',
            deleteCta: 'Delete application',
            revokeCta: 'Revoke',
            approveCta: 'Approve application',
          },
        },
      },
    },
  },
};
