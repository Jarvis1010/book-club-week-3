import parseTheParcel, {
  MAXIMUM_ERROR_MESSAGE,
  INVALID_PARAMETERS_ERROR_MESSAGE,
  MAX_WEIGHT,
  MAX_SMALL_LENGTH,
  MAX_SMALL_BREADTH,
  MAX_SMALL_HEIGHT,
  MAX_MEDIUM_LENGTH,
  MAX_MEDIUM_BREADTH,
  MAX_MEDIUM_HEIGHT,
  MAX_LARGE_LENGTH,
  MAX_LARGE_BREADTH,
  MAX_LARGE_HEIGHT,
} from "./";

describe("Validates parameters", () => {
  it("throws if parcel is undefined", () => {
    expect(() => parseTheParcel()).toThrow(INVALID_PARAMETERS_ERROR_MESSAGE);
  });

  it("throws if dimensions is undefined", () => {
    expect(() => parseTheParcel({})).toThrow(INVALID_PARAMETERS_ERROR_MESSAGE);
  });

  it("throws if weight is not Int", () => {
    const parcelInvalidWeight = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: "25",
    };

    expect(() => parseTheParcel(parcelInvalidWeight)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if weight is negative int", () => {
    const parcelInvalidWeight = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: -1,
    };

    expect(() => parseTheParcel(parcelInvalidWeight)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if length is not Int", () => {
    const parcelInvalidLength = {
      dimensionsInMM: {
        length: "200",
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInvalidLength)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if length is a negative integer", () => {
    const parcelInValidLength = {
      dimensionsInMM: {
        length: -1,
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInValidLength)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if breadth is not Int", () => {
    const parcelInvalidBreadth = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: "300",
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInvalidBreadth)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if breadth is negative int", () => {
    const parcelInvalidBreadth = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: -1,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInvalidBreadth)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if height is not Int", () => {
    const parcelInvalidHeight = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: "150",
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInvalidHeight)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });

  it("throws if height is negative int", () => {
    const parcelInvalidHeight = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: -1,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelInvalidHeight)).toThrow(
      INVALID_PARAMETERS_ERROR_MESSAGE
    );
  });
});

describe("throws for excess current price of parcel", () => {
  const smallDimensions = {
    length: MAX_SMALL_LENGTH,
    breadth: MAX_SMALL_BREADTH,
    height: MAX_SMALL_HEIGHT,
  };

  const smallParcel = {
    dimensionsInMM: { ...smallDimensions },
    weightInKg: MAX_WEIGHT,
  };

  it("should throw if weight exceeds 25K", () => {
    const parcelTooHeavy = {
      ...smallParcel,
      weightInKg: MAX_WEIGHT + 1,
    };
    expect(() => parseTheParcel(parcelTooHeavy)).toThrow(MAXIMUM_ERROR_MESSAGE);
  });

  it("should throw if dimensions exceeds maximum length", () => {
    const parcelTooLong = {
      dimensionsInMM: {
        ...smallDimensions,
        length: MAX_LARGE_LENGTH + 1,
      },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelTooLong)).toThrow(MAXIMUM_ERROR_MESSAGE);
  });

  it("should throw if dimensions exceeds maximum breadth", () => {
    const parcelTooBroad = {
      dimensionsInMM: { ...smallDimensions, breadth: MAX_LARGE_BREADTH + 1 },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelTooBroad)).toThrow(MAXIMUM_ERROR_MESSAGE);
  });

  it("should throw if dimensions exceeds maximum height", () => {
    const parcelTooBroad = {
      dimensionsInMM: { ...smallDimensions, height: MAX_LARGE_HEIGHT + 1 },
      weightInKg: MAX_WEIGHT,
    };
    expect(() => parseTheParcel(parcelTooBroad)).toThrow(MAXIMUM_ERROR_MESSAGE);
  });
});

describe("Returns current price of parcel", () => {
  it("returns 5.00 if all of dimensions are small", () => {
    const smallestParcel = {
      dimensionsInMM: { length: 1, breadth: 1, height: 1 },
      weightInKg: 1,
    };

    const maxSmallParcel = {
      dimensionsInMM: {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      weightInKg: MAX_WEIGHT,
    };

    [smallestParcel, maxSmallParcel].forEach(parcel => {
      const price = parseTheParcel(parcel);

      expect(price).toBe(5.0);
    });
  });

  it("returns 7.50 for if at least one of dimensions are medium", () => {
    const minimumMediumLength = MAX_SMALL_LENGTH + 1;
    const minimumMediumBreadth = MAX_SMALL_BREADTH + 1;
    const minimumMediumHeight = MAX_SMALL_HEIGHT + 1;

    const parcelDimensions = [
      {
        length: minimumMediumLength,
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      {
        length: MAX_SMALL_LENGTH,
        breadth: minimumMediumBreadth,
        height: MAX_SMALL_HEIGHT,
      },
      {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
        height: minimumMediumHeight,
      },
      {
        length: minimumMediumLength,
        breadth: minimumMediumBreadth,
        height: MAX_SMALL_HEIGHT,
      },
      {
        length: MAX_SMALL_LENGTH,
        breadth: minimumMediumBreadth,
        height: minimumMediumHeight,
      },
      {
        length: minimumMediumLength,
        breadth: minimumMediumBreadth,
        height: minimumMediumHeight,
      },
      {
        length: MAX_MEDIUM_LENGTH,
        breadth: MAX_MEDIUM_BREADTH,
        height: MAX_MEDIUM_HEIGHT,
      },
    ];

    parcelDimensions
      .map(dimensionsInMM => ({ dimensionsInMM, weightInKg: MAX_WEIGHT }))
      .forEach(parcel => {
        expect(parseTheParcel(parcel)).toBe(7.5);
      });
  });

  it("returns 8.50 for if at least one of dimension are large", () => {
    const minimumLargeLength = MAX_MEDIUM_LENGTH + 1;
    const minimumLargeBreadth = MAX_MEDIUM_BREADTH + 1;
    const minimumLargeHeight = MAX_MEDIUM_HEIGHT + 1;

    const parecelsLargeByLength = [
      {
        breadth: MAX_SMALL_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      {
        breadth: MAX_SMALL_BREADTH,
        height: MAX_MEDIUM_HEIGHT,
      },
      {
        breadth: MAX_MEDIUM_BREADTH,
        height: MAX_SMALL_HEIGHT,
      },
      {
        breadth: MAX_MEDIUM_BREADTH,
        height: MAX_MEDIUM_HEIGHT,
      },
    ].map(dimmensions => ({ ...dimmensions, length: minimumLargeLength }));

    const parecelsLargeByBreadth = [
      {
        length: MAX_SMALL_LENGTH,
        height: MAX_SMALL_HEIGHT,
      },
      {
        length: MAX_MEDIUM_LENGTH,
        height: MAX_SMALL_HEIGHT,
      },
      {
        length: MAX_SMALL_LENGTH,
        height: MAX_MEDIUM_HEIGHT,
      },
      {
        length: MAX_MEDIUM_LENGTH,
        height: MAX_MEDIUM_HEIGHT,
      },
    ].map(dimmensions => ({ ...dimmensions, breadth: minimumLargeBreadth }));

    const parecelsLargeByHeight = [
      {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_SMALL_BREADTH,
      },
      {
        length: MAX_SMALL_LENGTH,
        breadth: MAX_MEDIUM_BREADTH,
      },
      {
        length: MAX_MEDIUM_LENGTH,
        breadth: MAX_SMALL_BREADTH,
      },
      {
        length: MAX_MEDIUM_LENGTH,
        breadth: MAX_MEDIUM_BREADTH,
      },
    ].map(dimmensions => ({ ...dimmensions, height: minimumLargeHeight }));

    const minMaxLargeParcels = [
      {
        length: minimumLargeLength,
        breadth: minimumLargeBreadth,
        height: minimumLargeHeight,
      },
      {
        length: MAX_LARGE_LENGTH,
        breadth: MAX_LARGE_BREADTH,
        height: MAX_LARGE_HEIGHT,
      },
    ];

    [
      ...parecelsLargeByLength,
      ...parecelsLargeByBreadth,
      ...parecelsLargeByHeight,
      ...minMaxLargeParcels,
    ]
      .map(dimensionsInMM => ({ dimensionsInMM, weightInKg: MAX_WEIGHT }))
      .forEach(parcel => {
        expect(parseTheParcel(parcel)).toBe(8.5);
      });
  });
});
