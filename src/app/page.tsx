"use client";
import { useCallback, useEffect, useState } from "react";
import {
  fillBoxes,
  fillGuesses,
  getAverageBenchmarkResult,
  getBGColorWithCorrespondingBoxID,
  getMarginWithCorrespondingN,
  getRandomInt,
  runBenchmark,
} from "./utils";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Box from "@/components/Box";
import TypographyCheckbox from "@/components/TypographyCheckbox";
import Modal from "@/components/Modal";
import NumberPicker from "@/components/NumberPicker";

export default function Home() {
  const [n, setN] = useState<number>(10);
  const [rp, setRp] = useState<number>();
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [guesses, setGuesses] = useState<Array<number>>();
  const [started, setStarted] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(0);
  const [boxes, setBoxes] = useState<Array<number>>();
  const [autoStep, setAutoStep] = useState<boolean>(false);
  const [stepButtonDisabled, setStepButtonDisabled] = useState<boolean>(false);
  const [autoStepCheckboxDisabled, setAutoStepCheckboxDisabled] =
    useState<boolean>(false);
  const [autoStepCounterStarted, setAutoStepCounterStarted] =
    useState<boolean>(false);
  const [settingsModalVisible, setSettingsModalVisible] =
    useState<boolean>(false);
  const [resetNeeded, setResetNeeded] = useState<boolean>(true);
  const [settingsButtonDisabled, setSettingsButtonDisabled] =
    useState<boolean>(false);
  const [autoStepDelay, setAutoStepDelay] = useState<number>(500);
  const [benchmarkModalVisible, setBenchmarkModalVisible] =
    useState<boolean>(false);
  const [benchmarkResultsModalVisible, setBenchmarkResultsModalVisible] =
    useState<boolean>(false);
  const [benchmarkResultState, setBenchmarkResultState] = useState<number>(-1);
  const [limitsDisabled, setLimitsDisabled] = useState<boolean>(false);

  var interval: NodeJS.Timeout;

  useEffect(() => {
    if (resetNeeded) {
      setResetNeeded(false);
      console.log("resetting..");
      setBoxes(fillBoxes(n));
      setGuesses(fillGuesses(n));
      setCurrentGuess(0);
      setRp(getRandomInt(n));
      setFound(false);
      setStarted(false);
      setAutoStepCheckboxDisabled(false);
      setAutoStep(false);
      setStepButtonDisabled(false);
      setSettingsButtonDisabled(false);
      setAutoStepCounterStarted(false);
      clearInterval(interval);
      setTurn(0);
    }
  }, [resetNeeded]);

  useEffect(() => {
    if (found == true) {
      clearInterval(interval);
      setAutoStep(false);
      setStepButtonDisabled(true);
    }
  }, [found]);

  useEffect(() => {
    if (autoStep === true && !autoStepCounterStarted) {
      interval = setInterval(step, autoStepDelay);
      setAutoStepCounterStarted(true);

      return () => clearInterval(interval);
    }
  }, [autoStep]);

  useEffect(() => {
    if (started && !found) {
      console.log("Stepping simulation...");
      for (var boxIndex = 0; boxIndex < n; boxIndex++) {
        boxes![boxIndex] = 0;
      }

      if (currentGuess === rp) {
        setFound(true);
        boxes![currentGuess] = 3;
        return;
      }

      setCurrentGuess(guesses![n % 2 != 0 ? turn - 1 : turn]);
      boxes![currentGuess] = 1;

      if (rp === 0) {
        setRp(rp + 1);
      } else if (rp === n - 1) {
        setRp(rp - 1);
      } else {
        setRp(Math.random() < 0.5 ? rp! - 1 : rp! + 1);
      }
      boxes![rp!] = 2;

      console.log(turn);
    }
  }, [turn]);

  const step = useCallback(() => {
    setTurn((prevTurn) => {
      if (!found) {
        if (!started) {
          setStarted(true);
          setAutoStepCheckboxDisabled(true);
          setSettingsButtonDisabled(true);
        }
        return prevTurn + 1;
      }
      return prevTurn; // If found is true, return the current turn without incrementing
    });
  }, [found, started]);

  return (
    //color: ${isFound ? 'red' : 'green'}
    <main className="flex min-h-screen flex-col items-center justify-between px-64 py-16">
      <div
        className={`z-10 max-w-5xl w-full items-start justify-between font-mono text-sm flex p-2 ${
          found ? "bg-red-400" : ""
        }`}
      >
        <Typography>n: {n}</Typography>
        <Typography className="text-yellow-500">rp: {rp}</Typography>
        <Typography className="text-blue-400">guess: {currentGuess}</Typography>
        <Typography>turn: {turn}</Typography>

        <div className="space-x-4 flex-row flex place-items-center">
          <Button onClick={() => step()} disabled={stepButtonDisabled}>
            Step
          </Button>
          <Button onClick={() => setResetNeeded(true)}>Reset</Button>
          <Button
            onClick={() => setSettingsModalVisible(true)}
            disabled={settingsButtonDisabled}
          >
            Settings
          </Button>
          <Button onClick={() => setBenchmarkModalVisible(true)}>
            Benchmark
          </Button>
          <TypographyCheckbox
            handleChange={(newValue: boolean) => {
              console.log(newValue);
              setAutoStep(newValue);
              setStepButtonDisabled(newValue);
            }}
            disabled={autoStepCheckboxDisabled}
            valueOverrideState={autoStep}
          >
            auto step
          </TypographyCheckbox>
        </div>
      </div>
      {/* flex flex-wrap justify-center w-full */}
      <div
        className={`flex flex-wrap justify-center w-full ${getMarginWithCorrespondingN(
          n
        )}`}
      >
        {boxes?.map((box, i) => {
          return (
            <Box key={i} bgcolor={getBGColorWithCorrespondingBoxID(box)}></Box>
          );
        })}
      </div>
      <div>
        <Modal
          title="Settings"
          id="settings-modal"
          hidden={!settingsModalVisible}
          modalVisible={settingsModalVisible}
          setModalVisible={setSettingsModalVisible}
        >
          <div>
            <div className="flex flex-row place-items-center">
              <Typography>n (the number of boxes): </Typography>
              <NumberPicker
                handleChange={(newN: number) => {
                  setN(newN);
                  setResetNeeded(true);
                }}
                placeholder="10"
                className="ml-1"
                minValue={limitsDisabled ? 0 : 10}
                maxValue={limitsDisabled ? 9999 : 500}
              ></NumberPicker>
            </div>
            <div className="flex flex-row place-items-center">
              <Typography>auto step delay (in ms): </Typography>
              <NumberPicker
                handleChange={(newDelay: number) => {
                  setAutoStepDelay(newDelay);
                  setResetNeeded(true);
                }}
                placeholder="500"
                className="ml-4"
                minValue={limitsDisabled ? 1 : 100}
              ></NumberPicker>
            </div>
            <TypographyCheckbox
              handleChange={(newValue: boolean) => {
                setLimitsDisabled(newValue);
              }}
              typographyFontSizeOverride="text-s"
            >
              Disable limits (potentially unstable and inperformant)
            </TypographyCheckbox>
          </div>
        </Modal>
        <Modal
          title={"Benchmark"}
          id={"benchmark-modal"}
          hidden={!benchmarkModalVisible}
          modalVisible={benchmarkModalVisible}
          setModalVisible={setBenchmarkModalVisible}
        >
          <Typography>
            run 1000 simulations with the current n value and get the average
            time in ms
          </Typography>
          <div className="space-x-4">
            <Button
              onClick={() => {
                setBenchmarkResultState(
                  getAverageBenchmarkResult(n, rp!, guesses!, Date.now())!
                );
                setBenchmarkResultsModalVisible(true);
              }}
            >
              Run benchmark
            </Button>

            <Button
              onClick={() => {
                setBenchmarkResultState(
                  runBenchmark(n, rp!, guesses!, Date.now())!
                );
                setBenchmarkResultsModalVisible(true);
              }}
            >
              Run single benchmark
            </Button>
          </div>
        </Modal>
        <Modal
          title={"Benchmark results"}
          id={"benchmark-results-modal"}
          hidden={!benchmarkResultsModalVisible}
          modalVisible={benchmarkResultsModalVisible}
          setModalVisible={setBenchmarkResultsModalVisible}
          disableBg={true}
        >
          <Typography>
            {benchmarkResultState === -1
              ? "Error: Could not calculate benchmark result"
              : benchmarkResultState + "ms"}
          </Typography>
        </Modal>
      </div>
    </main>
  );
}
