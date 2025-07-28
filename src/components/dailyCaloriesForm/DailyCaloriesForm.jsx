import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './DailyCaloriesForm.module.css';
import { calculateDailyCalories } from '../../utils/calculations';
import Modal from '../modal/Modal'; 
import DailyCalorieIntake from '../dailyCalorieIntake/DailyCalorieIntake'; 

const validationSchema = Yup.object({
  height: Yup.number()
    .typeError('Height must be a number')
    .positive('Height must be positive')
    .required('Height is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  currentWeight: Yup.number()
    .typeError('Current weight must be a number')
    .positive('Current weight must be positive')
    .required('Current weight is required'),
  desiredWeight: Yup.number()
    .typeError('Desired weight must be a number')
    .positive('Desired weight must be positive')
    .required('Desired weight is required'),
  bloodType: Yup.string().required('Blood type is required'),
});

const DailyCaloriesForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [calorieData, setCalorieData] = useState({
    calories: 0,
    notAllowedFoods: ['Flour products', 'Milk', 'Red meat', 'Smoked meats'], // Örnek veri
  });

  const openModal = () => {
    setIsModalOpen(true);
  }; 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      height: '',
      age: '',
      currentWeight: '',
      desiredWeight: '',
      bloodType: '1',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        const calories = calculateDailyCalories(values);
        // alert(`Your recommended daily calorie intake is ${calories.toFixed(0)} kcal`);
        setCalorieData(prevData => ({ ...prevData, calories })); 
        openModal(); 
        resetForm();
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formColumns}>
          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label htmlFor="height">Height *</label>
              <input
                id="height"
                name="height"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.height}
              />
              {formik.touched.height && formik.errors.height ? (
                <div className={styles.error}>{formik.errors.height}</div>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="age">Age *</label>
              <input
                id="age"
                name="age"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age ? (
                <div className={styles.error}>{formik.errors.age}</div>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="currentWeight">Current weight *</label>
              <input
                id="currentWeight"
                name="currentWeight"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentWeight}
              />
              {formik.touched.currentWeight && formik.errors.currentWeight ? (
                <div className={styles.error}>{formik.errors.currentWeight}</div>
              ) : null}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.inputGroup}>
              <label htmlFor="desiredWeight">Desired weight *</label>
              <input
                id="desiredWeight"
                name="desiredWeight"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desiredWeight}
              />
              {formik.touched.desiredWeight && formik.errors.desiredWeight ? (
                <div className={styles.error}>{formik.errors.desiredWeight}</div>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <label>Blood type *</label>
              <div className={styles.radioGroup} role="group" aria-labelledby="blood-type-group">
                {[1, 2, 3, 4].map(type => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={String(type)}
                      checked={formik.values.bloodType === String(type)}
                      onChange={formik.handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.customRadio}></span>
                    <span className={styles.labelText}>{type}</span>
                  </label>
                ))}
              </div>
              {formik.touched.bloodType && formik.errors.bloodType ? (
                <div className={styles.error}>{formik.errors.bloodType}</div>
              ) : null}
            </div>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          Start losing weight
        </button>
      </form>

      
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DailyCalorieIntake
            calories={calorieData.calories}
            products={calorieData.notAllowedFoods}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default DailyCaloriesForm;
