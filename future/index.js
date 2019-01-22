export const MAXIMUM_ERROR_MESSAGE =
  "weight and/or dimensions exceed maximum threshold";

export const INVALID_PARAMETERS_ERROR_MESSAGE = "Invalid Parameters";

export const MAX_WEIGHT = 25;

export const MAX_SMALL_BREADTH = 300;
export const MAX_SMALL_HEIGHT = 150;
export const MAX_SMALL_LENGTH = 200;

export const MAX_MEDIUM_LENGTH = 300;
export const MAX_MEDIUM_BREADTH = 400;
export const MAX_MEDIUM_HEIGHT = 200;

export const MAX_LARGE_LENGTH = 400;
export const MAX_LARGE_BREADTH = 600;
export const MAX_LARGE_HEIGHT = 250;

const validateParameters = parcel => {
  if (parcel === undefined) {
    throw INVALID_PARAMETERS_ERROR_MESSAGE;
  }
  const { dimensionsInMM, weightInKg } = parcel;

  if (
    dimensionsInMM === undefined ||
    !Number.isInteger(weightInKg) ||
    !Number.isInteger(dimensionsInMM.length) ||
    !Number.isInteger(dimensionsInMM.breadth) ||
    !Number.isInteger(dimensionsInMM.height) ||
    weightInKg < 0 ||
    dimensionsInMM.length < 0 ||
    dimensionsInMM.breadth < 0 ||
    dimensionsInMM.height < 0
  ) {
    throw INVALID_PARAMETERS_ERROR_MESSAGE;
  }
};

const validateMaximums = ({
  dimensionsInMM: { length, breadth, height },
  weightInKg,
}) => {
  if (
    weightInKg > MAX_WEIGHT ||
    length > MAX_LARGE_LENGTH ||
    breadth > MAX_LARGE_BREADTH ||
    height > MAX_LARGE_HEIGHT
  ) {
    throw MAXIMUM_ERROR_MESSAGE;
  }
};

const getPrice = ({ length, breadth, height }) => {
  switch (true) {
    case length <= MAX_SMALL_LENGTH &&
      breadth <= MAX_SMALL_BREADTH &&
      height <= MAX_SMALL_HEIGHT: {
      return 5.0;
    }

    case length > MAX_MEDIUM_LENGTH ||
      breadth > MAX_MEDIUM_BREADTH ||
      height > MAX_MEDIUM_HEIGHT: {
      return 8.5;
    }

    default: {
      return 7.5;
    }
  }
};

const parseTheParcel = parcel => {
  validateParameters(parcel);
  validateMaximums(parcel);
  const { dimensionsInMM } = parcel;

  return getPrice(dimensionsInMM);
};

export default parseTheParcel;
