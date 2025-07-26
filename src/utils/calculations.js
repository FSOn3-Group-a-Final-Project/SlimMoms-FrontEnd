export const calculateDailyCalories = (values) => {
  const { height, age, currentWeight, desiredWeight } = values;
  
  // Formula: 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)
  const calculatedCalories = 
    10 * Number(currentWeight) + 
    6.25 * Number(height) - 
    5 * Number(age) - 
    161 - 
    10 * (Number(currentWeight) - Number(desiredWeight));

  return Math.round(calculatedCalories);
}; 