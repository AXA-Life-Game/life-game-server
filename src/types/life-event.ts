type LifeEvent = {
  type: LifeEventTypes;
  frequency: Frequency;
  effect: LifeEventEffect;
};

type LifeEventEffect = {
  lifebars: Lifebar[];
  lifeEvents: Pick<LifeEvent, "type" | "frequency">[];
};

type Frequency = {
  limit: number;
  probability?: Percentage;
};

type Percentage = number;
type LifeEventTypes = "JOB" | "APARTMENT" | "3A_INSURANCE" | "PART_TIME_JOB";

export type Lifebar = {
  type: LifebarType;
  value: number;
};

export enum LifebarType {
  MONEY,
  AGE,
  CHILDAGE,
  INCOME,
  TAX,
  EXPENSES,
  THIRDPILLAR,
  SECONDPILLAR,
}

const jobEvent: LifeEvent = {
  type: "JOB",
  frequency: {
    limit: 3,
    probability: 1,
  },
  effect: {
    lifebars: [
      {
        type: LifebarType.INCOME,
        value: 5000,
      },
      {
        type: LifebarType.TAX,
        value: 550,
      },
    ],
    lifeEvents: [
      {
        type: "APARTMENT",
        frequency: {
          limit: 3,
        },
      },
      {
        type: "JOB",
        frequency: {
          limit: 0,
        },
      },
      {
        type: "PART_TIME_JOB",
        frequency: {
          limit: 3,
        },
      },
    ],
  },
};

export type GameState = {
  lifebars: Lifebar[];
  collectedEvents: Event[];
  time: number;
};

// const getNextLifeEvent = (state: GameState) => {
//   const lifeEvent = lifeEvents.find((lifeEvent) => {
//     return Math.random() < lifeEvent.frequency.probability;
//   });

//   return lifeEvent;
// }
