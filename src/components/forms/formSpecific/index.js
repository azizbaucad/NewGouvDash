import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
  useToast,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { forms, routes } from '@theme';
import { ButtonBack } from '@components/common/button';
import { PageTitle } from '@components/common/title/page';
import { AiFillHome, AiOutlineTeam } from 'react-icons/ai';
import { Formik } from 'formik';
import { GoProject } from 'react-icons/go';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi2';
import { VscSymbolStructure } from 'react-icons/vsc';
import { RxActivityLog } from 'react-icons/rx';
import { VscLayoutActivitybarLeft } from 'react-icons/vsc';
import { CiCalendar } from 'react-icons/ci';
import { MdSchedule } from 'react-icons/md';
import { BsFileEarmarkRuled } from 'react-icons/bs';
import { FaRegFileLines } from 'react-icons/fa6';
import { FcTimeline } from 'react-icons/fc';
import { MdOutlinePendingActions } from "react-icons/md";

export const ActionForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="80%" mx="auto" p={6} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={18}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<MdOutlinePendingActions size={26} color="#9999ff" />}
            title={'Ajouter une action'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={4} />
      <Formik
        initialValues={{
          annee: '',
          dateRencontre: '',
          typeRencontre: '',
          codeRencontre: '',
          rencontre: '',
          codeDirective: '',
          typeDirectives: '',
          directives: '',
          responsable: '',
          ministereAssocies: '',
          dateLimite: '',
          dateLimitePrevue: '',
          dateDebutReel: '',
          dateFinReelle: '',
          etat: '',
        }}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack align="start" spacing={4}>
              <Heading as="legend" fontWeight={550} fontSize={14} mt={2} mb={2}>
                Informations de l'Action
              </Heading>

              {/* Grille d'Inputs */}
              <SimpleGrid columns={3} spacing={4} w="100%">
                {/* Colonne 1 */}
                <FormControl isInvalid={errors.annee && touched.annee}>
                  <FormLabel fontSize={12}>Année</FormLabel>
                  <Input
                    type="number"
                    name="annee"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.annee}
                  />
                </FormControl>

                <FormControl isInvalid={errors.dateRencontre && touched.dateRencontre}>
                  <FormLabel fontSize={12}>Date Rencontre</FormLabel>
                  <Input
                    type="date"
                    name="dateRencontre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateRencontre}
                  />
                </FormControl>

                <FormControl isInvalid={errors.typeRencontre && touched.typeRencontre}>
                  <FormLabel fontSize={12}>Type de Rencontre</FormLabel>
                  <Input
                    type="text"
                    name="typeRencontre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.typeRencontre}
                  />
                </FormControl>

                <FormControl isInvalid={errors.codeRencontre && touched.codeRencontre}>
                  <FormLabel fontSize={12}>Code Rencontre</FormLabel>
                  <Input
                    type="text"
                    name="codeRencontre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.codeRencontre}
                  />
                </FormControl>

                {/* Colonne 2 */}
                <FormControl isInvalid={errors.rencontre && touched.rencontre}>
                  <FormLabel fontSize={12}>Rencontre</FormLabel>
                  <Input
                    type="text"
                    name="rencontre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rencontre}
                  />
                </FormControl>

                <FormControl isInvalid={errors.codeDirective && touched.codeDirective}>
                  <FormLabel fontSize={12}>Code Directive</FormLabel>
                  <Input
                    type="text"
                    name="codeDirective"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.codeDirective}
                  />
                </FormControl>

                <FormControl isInvalid={errors.typeDirectives && touched.typeDirectives}>
                  <FormLabel fontSize={12}>Type de Directives</FormLabel>
                  <Input
                    type="text"
                    name="typeDirectives"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.typeDirectives}
                  />
                </FormControl>

                <FormControl isInvalid={errors.directives && touched.directives}>
                  <FormLabel fontSize={12}>Directives</FormLabel>
                  <Input
                    type="text"
                    name="directives"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.directives}
                  />
                </FormControl>

                {/* Colonne 3 */}
                <FormControl isInvalid={errors.responsable && touched.responsable}>
                  <FormLabel fontSize={12}>Responsable</FormLabel>
                  <Input
                    type="text"
                    name="responsable"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsable}
                  />
                </FormControl>

                <FormControl isInvalid={errors.ministereAssocies && touched.ministereAssocies}>
                  <FormLabel fontSize={12}>Ministères Associés</FormLabel>
                  <Input
                    type="text"
                    name="ministereAssocies"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ministereAssocies}
                  />
                </FormControl>

                <FormControl isInvalid={errors.dateLimite && touched.dateLimite}>
                  <FormLabel fontSize={12}>Date Limite</FormLabel>
                  <Input
                    type="date"
                    name="dateLimite"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateLimite}
                  />
                </FormControl>

                <FormControl isInvalid={errors.dateLimitePrevue && touched.dateLimitePrevue}>
                  <FormLabel fontSize={12}>Date Limite Prévue</FormLabel>
                  <Input
                    type="date"
                    name="dateLimitePrevue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateLimitePrevue}
                  />
                </FormControl>

                {/* Colonne 4 */}
                <FormControl isInvalid={errors.dateDebutReel && touched.dateDebutReel}>
                  <FormLabel fontSize={12}>Date Début Réel</FormLabel>
                  <Input
                    type="date"
                    name="dateDebutReel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateDebutReel}
                  />
                </FormControl>

                <FormControl isInvalid={errors.dateFinReelle && touched.dateFinReelle}>
                  <FormLabel fontSize={12}>Date Fin Réelle</FormLabel>
                  <Input
                    type="date"
                    name="dateFinReelle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateFinReelle}
                  />
                </FormControl>
               <HStack w={'100%'}>
               <FormControl isInvalid={errors.etat && touched.etat}>
                  <FormLabel fontSize={12}>Status</FormLabel>
                  <Select
                    name=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.etat}
                  >
                    <option value="" label="Sélectionnez un status" />
                    <option value="encours" label="En cours" />
                    <option value="en_attente" label="En attente" />
                    <option value="realise" label="Réalisé" />
                  </Select>
                </FormControl>
               </HStack>
                
              </SimpleGrid>

              <Button
                w={'100%'}
                bgColor={'#9999ff'}
                color={'white'}
                h={'2.5rem'}
                isLoading={isSubmitting}
                mt={8}
                type="submit"
              >
                Submit
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const ProjetForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="60%" mx="auto" p={6} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={18}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<FcTimeline size={26} color="#9999ff" />}
            title={'Ajouter un projet'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={4} />

      <Formik
        initialValues={{
          institution: '',
          structure: '',
          projetName: '',
          duree: '',
          budget: '',
          responsable: '',
          responsableEmail: '',
          responsableTel: '',
          dateDebut: '',
          dateFin: '',
          livraison: '',
          budgetConsomme: '',
          tauxEvolution: '',
        }}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Informations générales du projet */}
            <VStack align="start" spacing={4}>
              <Heading
                as="legend"
                fontWeight={550}
                fontSize={14}
                mt={2}
                mb={2}
                fontFamily="'Roboto mono', sans-serif"
              >
                Informations du Projet
              </Heading>

              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Institution</FormLabel>
                  <Select
                    name=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  >
                    <option value="" label="Sélectionnez une institution" />
                    <option value="Presidence" label="Présidence" />
                    <option value="Primture" label="Primature" />
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors.structure && touched.structure}>
                  <FormLabel fontSize={12}>Structure</FormLabel>
                  <Select
                    name="structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structure}
                  >
                    <option value="" label="Sélectionnez une structure" />
                    <option value="IGE" label="IGE" />
                    <option value="ITIE" label="ITIE" />
                  </Select>
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.projetName && touched.projetName}
                >
                  <FormLabel fontSize={12}>Nom du Projet</FormLabel>
                  <Input
                    type="text"
                    name="projetName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetName}
                  />
                </FormControl>

                <FormControl isInvalid={errors.duree && touched.duree}>
                  <FormLabel fontSize={12}>Durée</FormLabel>
                  <Input
                    type="number"
                    name="duree"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duree}
                  />
                </FormControl>
                <FormControl isInvalid={errors.budget && touched.budget}>
                  <FormLabel fontSize={12}>Budget</FormLabel>
                  <Input
                    type="number"
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* <Divider mt={4} mb={4} /> */}

            {/* Responsable du projet */}
            <VStack align="start" spacing={4}>
              <Heading
                as="legend"
                fontWeight={550}
                fontSize={14}
                mt={2}
                mb={2}
                fontFamily="'Roboto mono', sans-serif"
              >
                Responsable du Projet
              </Heading>

              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.responsable && touched.responsable}
                >
                  <FormLabel fontSize={12}>Responsable</FormLabel>
                  <Input
                    type="text"
                    name="responsable"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsable}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    errors.responsableEmail && touched.responsableEmail
                  }
                >
                  <FormLabel fontSize={12}>Email du Responsable</FormLabel>
                  <Input
                    type="email"
                    name="responsableEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsableEmail}
                  />
                </FormControl>
                <FormControl
                  isInvalid={errors.responsableTel && touched.responsableTel}
                >
                  <FormLabel fontSize={12}>Téléphone du Responsable</FormLabel>
                  <Input
                    type="tel"
                    name="responsableTel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsableTel}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* <Divider mt={4} mb={4} /> */}

            {/* Dates du projet */}
            <VStack align="start" spacing={4}>
              <Heading
                as="legend"
                fontWeight={550}
                fontSize={14}
                mt={2}
                mb={2}
                fontFamily="'Roboto mono', sans-serif"
              >
                Dates du Projet
              </Heading>

              <HStack w={'100%'} spacing={4}>
                <FormControl isInvalid={errors.dateDebut && touched.dateDebut}>
                  <FormLabel fontSize={12}>Date de Début</FormLabel>
                  <Input
                    type="date"
                    name="dateDebut"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateDebut}
                  />
                </FormControl>

                <FormControl isInvalid={errors.dateFin && touched.dateFin}>
                  <FormLabel fontSize={12}>Date de Fin</FormLabel>
                  <Input
                    type="date"
                    name="dateFin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateFin}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/*             <Divider mt={4} mb={4} /> */}

            {/* KPIs */}
            <VStack align="start" spacing={4}>
              <Heading
                as="legend"
                fontWeight={550}
                fontSize={14}
                mt={2}
                mb={2}
                fontFamily="'Roboto mono', sans-serif"
              >
                KPIs du Projet
              </Heading>

              <HStack w={'100%'} spacing={4}>
                <FormControl isInvalid={errors.livraison && touched.livraison}>
                  <FormLabel fontSize={12}>Livraison</FormLabel>
                  <Input
                    type="text"
                    name="livraison"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.livraison}
                  />
                </FormControl>

                <FormControl
                  isInvalid={errors.budgetConsomme && touched.budgetConsomme}
                >
                  <FormLabel fontSize={12}>Budget Consommé</FormLabel>
                  <Input
                    type="number"
                    name="budgetConsomme"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budgetConsomme}
                  />
                </FormControl>

                <FormControl
                  isInvalid={errors.tauxEvolution && touched.tauxEvolution}
                >
                  <FormLabel fontSize={12}>Taux d'Évolution</FormLabel>
                  <Input
                    type="number"
                    name="tauxEvolution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tauxEvolution}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              mt={8}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const PlanForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<MdSchedule size={26} color="#9999ff" />} // Update to Programme icon if needed
            title={'Ajouter un plan'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          programmeName: '', // Nom programme
          budget: '', // Budget
          duration: '', // Durée
          firstname: '', // Responsable: Prénom
          lastname: '', // Responsable: Nom
          email: '', // Responsable: Email
          role: '', // Responsable: Rôle
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom du programme */}
            <VStack align="start">
              <Heading as={'legend'} fontSize={'14'}>
                Informations plan
              </Heading>
              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Institution</FormLabel>
                  <Select
                    name=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  >
                    <option value="" label="Sélectionnez une institution" />
                    <option value="Presidence" label="Présidence" />
                    <option value="Primture" label="Primature" />
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors.structure && touched.structure}>
                  <FormLabel fontSize={12}>Structure</FormLabel>
                  <Select
                    name="structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structure}
                  >
                    <option value="" label="Sélectionnez une structure" />
                    <option value="IGE" label="IGE" />
                    <option value="ITIE" label="ITIE" />
                  </Select>
                </FormControl>
              </HStack>
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl
                  isInvalid={errors.programmeName && touched.programmeName}
                >
                  <FormLabel fontSize={12}>Nom Plan</FormLabel>
                  <Input
                    type="text"
                    name="programmeName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.programmeName}
                  />
                </FormControl>

                <FormControl isInvalid={errors.budget && touched.budget}>
                  <FormLabel fontSize={12}>Budget</FormLabel>
                  <Input
                    type="number"
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl isInvalid={errors.duration && touched.duration}>
                  <FormLabel fontSize={12}>Durée</FormLabel>
                  <Input
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Programme : Prénom, Nom, Email */}
            <VStack align="start">
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Plan
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const DirectiveForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<FaRegFileLines size={26} color="#9999ff" />} // Update to Programme icon if needed
            title={'Ajouter une directive'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          programmeName: '', // Nom programme
          budget: '', // Budget
          duration: '', // Durée
          firstname: '', // Responsable: Prénom
          lastname: '', // Responsable: Nom
          email: '', // Responsable: Email
          role: '', // Responsable: Rôle
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom du programme */}
            <VStack align="start">
              <Heading as={'legend'} fontSize={'14'}>
                Informations Directive
              </Heading>
              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Institution</FormLabel>
                  <Select
                    name=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  >
                    <option value="" label="Sélectionnez une institution" />
                    <option value="Presidence" label="Présidence" />
                    <option value="Primture" label="Primature" />
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors.structure && touched.structure}>
                  <FormLabel fontSize={12}>Structure</FormLabel>
                  <Select
                    name="structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structure}
                  >
                    <option value="" label="Sélectionnez une structure" />
                    <option value="IGE" label="IGE" />
                    <option value="ITIE" label="ITIE" />
                  </Select>
                </FormControl>
              </HStack>
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl
                  isInvalid={errors.programmeName && touched.programmeName}
                >
                  <FormLabel fontSize={12}>Nom Directive</FormLabel>
                  <Input
                    type="text"
                    name="programmeName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.programmeName}
                  />
                </FormControl>

                <FormControl isInvalid={errors.budget && touched.budget}>
                  <FormLabel fontSize={12}>Budget</FormLabel>
                  <Input
                    type="number"
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl isInvalid={errors.duration && touched.duration}>
                  <FormLabel fontSize={12}>Durée</FormLabel>
                  <Input
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Programme : Prénom, Nom, Email */}
            <VStack align="start">
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Directive
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const ProgrammeForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<CiCalendar size={26} color="#9999ff" />} // Update to Programme icon if needed
            title={'Ajouter un programme'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          programmeName: '', // Nom programme
          budget: '', // Budget
          duration: '', // Durée
          firstname: '', // Responsable: Prénom
          lastname: '', // Responsable: Nom
          email: '', // Responsable: Email
          role: '', // Responsable: Rôle
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom du programme */}
            <VStack align="start">
              <Heading as={'legend'} fontSize={'14'}>
                Informations programme
              </Heading>
              <HStack w={'100%'} spacing={4}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Institution</FormLabel>
                  <Select
                    name=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  >
                    <option value="" label="Sélectionnez une institution" />
                    <option value="Presidence" label="Présidence" />
                    <option value="Primture" label="Primature" />
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors.structure && touched.structure}>
                  <FormLabel fontSize={12}>Structure</FormLabel>
                  <Select
                    name="structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structure}
                  >
                    <option value="" label="Sélectionnez une structure" />
                    <option value="IGE" label="IGE" />
                    <option value="ITIE" label="ITIE" />
                  </Select>
                </FormControl>
              </HStack>
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl
                  isInvalid={errors.programmeName && touched.programmeName}
                >
                  <FormLabel fontSize={12}>Nom Programme</FormLabel>
                  <Input
                    type="text"
                    name="programmeName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.programmeName}
                  />
                </FormControl>

                <FormControl isInvalid={errors.budget && touched.budget}>
                  <FormLabel fontSize={12}>Budget</FormLabel>
                  <Input
                    type="number"
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl isInvalid={errors.duration && touched.duration}>
                  <FormLabel fontSize={12}>Durée</FormLabel>
                  <Input
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Programme : Prénom, Nom, Email */}
            <VStack align="start">
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Programme
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const InstitutionForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<HiOutlineHome size={26} color="#9999ff" />}
            title={'Ajouter une institution'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          structure: '',
          institution: '',
          role: '',
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom de l'institution */}
            <VStack align="start">
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Nom de l'Institution</FormLabel>
                  <Input
                    type="text"
                    name="institution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Institution : Prénom, Nom, Email */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Institution
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const ActiviteForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<VscLayoutActivitybarLeft size={26} color="#9999ff" />}
            title={'Ajouter une activité'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          firstname: '',
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom de l'institution */}
            <VStack align="start">
              <HStack w={'100%'} spacing={4} mb={6}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Nom Activité</FormLabel>
                  <Input
                    type="text"
                    name="institution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const EquipeForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<AiOutlineTeam size={26} color="#9999ff" />}
            title={'Ajouter une équipe'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          teamName: '', // Nom équipe
          teamEmail: '', // Email équipe
          firstname: '', // Responsable: Prénom
          lastname: '', // Responsable: Nom
          email: '', // Responsable: Email
          role: '', // Responsable: Rôle
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom de l'équipe */}
            <VStack align="start">
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl isInvalid={errors.teamName && touched.teamName}>
                  <FormLabel fontSize={12}>Nom Équipe</FormLabel>
                  <Input
                    type="text"
                    name="teamName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.teamName}
                  />
                </FormControl>

                <FormControl isInvalid={errors.teamEmail && touched.teamEmail}>
                  <FormLabel fontSize={12}>Email Équipe</FormLabel>
                  <Input
                    type="email"
                    name="teamEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.teamEmail}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Équipe : Prénom, Nom, Email */}
            <VStack align="start">
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Équipe
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const StructureForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<VscSymbolStructure size={26} color="#9999ff" />}
            title={'Ajouter une structure'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          structure: '',
          institution: '',
          role: '',
        }}
        validationSchema={props.validationSchema} // Ajout de la validation si nécessaire
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Nom de l'institution */}
            <VStack align="start">
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Nom Structure</FormLabel>
                  <Input
                    type="text"
                    name="institution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Responsable Institution : Prénom, Nom, Email */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Responsable Structure
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>Prénom</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>

              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>

              {/* Role */}
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Rôle</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Sélectionnez un rôle" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Bouton Submit */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const ContactForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box w="50%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<MdOutlineSwitchAccount size={26} color="#9999ff" />}
            title={'Ajouter un compte'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          structure: '',
          institution: '',
          role: '',
        }}
        validationSchema={props.validationSchema} // Add validation if needed
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Firstname, Lastname, and Email */}
            <VStack align="start">
              <Heading align="start" as="legend" fontSize={14}>
                Personal Information
              </Heading>
              <HStack w={'100%'} spacing={4} mb={2}>
                <FormControl isInvalid={errors.firstname && touched.firstname}>
                  <FormLabel fontSize={12}>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </FormControl>

                <FormControl isInvalid={errors.lastname && touched.lastname}>
                  <FormLabel fontSize={12}>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </FormControl>
              </HStack>
              <HStack w={'100%'} mb={2}>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Structure, Institution, and Role */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14} mt={2} mb={2}>
                Organization Details
              </Heading>
              <HStack w={'100%'} spacing={4} mb={4}>
                <FormControl isInvalid={errors.structure && touched.structure}>
                  <FormLabel fontSize={12}>Structure</FormLabel>
                  <Select
                    name="structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structure}
                  >
                    <option value="" label="Select structure" />
                    <option value="IGE" label="IGE" />
                    <option value="IGF" label="IGF" />
                    <option value="ITIE" label="ITIE" />
                  </Select>
                </FormControl>

                <FormControl
                  isInvalid={errors.institution && touched.institution}
                >
                  <FormLabel fontSize={12}>Institution</FormLabel>
                  <Select
                    name="institution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution}
                  >
                    <option value="" label="Select institution" />
                    <option value="Presidence" label="Presidence" />
                    <option value="Primature" label="Primature" />
                  </Select>
                </FormControl>
              </HStack>
              <HStack w={'100%'} mb={8}>
                <FormControl isInvalid={errors.role && touched.role}>
                  <FormLabel fontSize={12}>Role</FormLabel>
                  <Select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="" label="Select role" />
                    <option value="Responsable" label="Responsable" />
                    <option value="Ministre" label="Ministre" />
                  </Select>
                </FormControl>
              </HStack>
            </VStack>

            {/* Submit Button */}
            <Button
              w={'100%'}
              bgColor={'#9999ff'}
              color={'white'}
              h={'2.5rem'}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const ProjectForm = (props) => {
  const router = useRouter();

  const goBack = () => router.back();
  const {
    descForm: {
      week,
      structureValue,
      projetValue,
      currentYearValue,
      associatedMinisterValue,
      ownerMinisterValue,
      dateMettingValue,
      codeMettingValue,
      typeMettingValue,
      mettingValue,
      codeDirectiveValue,
      typeDirectiveValue,
      directiveValue,
      startRealDateValue,
      endRealDateValue,
      limitDateValue,
      previousLimitDateValue,
      stateValue,
      evitementSelfcareValue,
      submit,
    },
  } = forms.inputs;

  const valuesInitial = props.descForm ?? null;
  const toast = useToast();
  return (
    <Box maxW="100%" mx="auto" p={8} bg="#f1f5f9" borderRadius="lg">
      <HStack w={'100%'}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <PageTitle
            titleSize={16}
            titleColor={'black'}
            subtitleColor={'#404245'}
            subtitleSize={16}
            icon={<GoProject size={26} color="#9999ff" />}
            title={'Renseigner un projet'}
          />
        </Box>
      </HStack>
      <Divider mt={3} mb={3} />

      <Formik
        initialValues={props.initialValues ?? {}}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          props.onSubmit(values, setSubmitting, setFieldError);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* First Name, Email, and Phone */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14}>
                Responsable projet
              </Heading>
              <HStack spacing={4} mb={4}>
                <FormControl
                  isInvalid={errors.responsableNom && touched.responsableNom}
                >
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="responsableNom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsableNom}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    errors.responsableEmail && touched.responsableEmail
                  }
                >
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input
                    type="text"
                    name="responsableEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsableEmail}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.responsablePhone && touched.responsablePhone
                  }
                >
                  <FormLabel fontSize={12}>Téléphone</FormLabel>
                  <Input
                    type="text"
                    name="responsablePhone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsablePhone}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.responsablePhone && touched.responsablePhone
                  }
                >
                  <FormLabel fontSize={12}>Téléphone</FormLabel>
                  <Input
                    type="text"
                    name="responsablePhone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.responsablePhone}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Project Information */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14}>
                Projet
              </Heading>
              <HStack spacing={4} mb={4}>
                <FormControl isInvalid={errors.projetNom && touched.projetNom}>
                  <FormLabel fontSize={12}>Nom</FormLabel>
                  <Input
                    type="text"
                    name="projetNom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetNom}
                  />
                </FormControl>

                <FormControl
                  isInvalid={errors.projetStartDate && touched.projetStartDate}
                >
                  <FormLabel fontSize={12}>Date début</FormLabel>
                  <Input
                    type="date"
                    name="projetStartDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetStartDate}
                  />
                </FormControl>
                <FormControl
                  isInvalid={errors.projetEndDate && touched.projetEndDate}
                >
                  <FormLabel fontSize={12}>Date fin</FormLabel>
                  <Input
                    type="date"
                    name="projetEndDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetEndDate}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={4} mb={4}>
                <FormControl
                  isInvalid={errors.projetDuree && touched.projetDuree}
                >
                  <FormLabel fontSize={12}>Durée</FormLabel>
                  <Input
                    type="text"
                    name="projetDuree"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetDuree}
                  />
                </FormControl>

                <FormControl
                  isInvalid={errors.projetBudget && touched.projetBudget}
                >
                  <FormLabel fontSize={12}>Budget</FormLabel>
                  <Input
                    type="text"
                    name="projetBudget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetBudget}
                  />
                </FormControl>
              </HStack>
            </VStack>

            {/* Project KPIs */}
            <VStack align>
              <Heading align="start" as="legend" fontSize={14}>
                KPIs projet
              </Heading>
              <HStack spacing={4} mb={4}>
                <FormControl
                  isInvalid={errors.projetStatus && touched.projetStatus}
                >
                  <FormLabel fontSize={12}>Status projet</FormLabel>
                  <Input
                    type="text"
                    name="projetStatus"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projetStatus}
                  />
                </FormControl>

                <FormControl
                  isInvalid={errors.budgetConsome && touched.budgetConsome}
                >
                  <FormLabel fontSize={12}>Budget consommé</FormLabel>
                  <Input
                    type="text"
                    name="budgetConsome"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budgetConsome}
                  />
                </FormControl>
                <FormControl
                  isInvalid={errors.tauxEvolution && touched.tauxEvolution}
                >
                  <FormLabel fontSize={12}>Taux d'évolution</FormLabel>
                  <Input
                    type="text"
                    name="tauxEvolution"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tauxEvolution}
                  />
                </FormControl>
              </HStack>
            </VStack>

            <Box mb={4}></Box>

            {/* Submit Button */}
            <Button
              w={'100%'}
              _hover={'none'}
              bgColor={'#9999ff'}
              color={'white'}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export const completeForm = () => {
  return (
    <>
      {/* Query Type */}
      <FormControl as="fieldset" mb={4}>
        <FormLabel as="legend">Query Type</FormLabel>
        <RadioGroup
          name="queryType"
          onChange={handleChange}
          value={values.queryType}
        >
          <Stack direction="row">
            <Radio value="General Enquiry">General Enquiry</Radio>
            <Radio value="Support Request">Support Request</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* Message */}
      <FormControl mb={4} isInvalid={errors.message && touched.message}>
        <FormLabel>Message</FormLabel>
        <Textarea
          name="message"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
        />
      </FormControl>

      {/* Consent Checkbox */}
      <FormControl mb={6}>
        <Checkbox name="consent" onChange={handleChange} onBlur={handleBlur}>
          I consent to being contacted by the team
        </Checkbox>
      </FormControl>
    </>
  );
};
