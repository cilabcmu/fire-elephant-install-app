import { FC, useEffect, useState } from "react";
import { useStatusContext } from "../../App";
import { FormType, useForm } from "../../hooks/useForm";
import { STATUS, StatusContextType, UpdateLocationCheckSDType } from "../../public/type";

import { useMutation } from "@apollo/client";
import { UPDATE_LOCATION } from "../../api/mutationGQL";
import { centerCoordinate, maxCoordinate } from "../../api/config";
import coordinateToKilometers from "../../api/coor2kilometers";
import InputID from "./inputID";
import InputCoordinate from "./inputCoodinate";
import { ButtonForm, ClearButton } from "./btnForm";
import HelpText, { HelpTextType } from "./helpText";

const maxDistance: number = coordinateToKilometers(centerCoordinate, maxCoordinate);

const initForm: FormType = {
  id: "",
  lat: "",
  long: "",
};

const Form: FC = () => {
  const [updateLocation, { data, loading, error }] = useMutation(UPDATE_LOCATION);

  const { status, setStatus, isAutoGPS, systemMode } = useStatusContext() as StatusContextType;

  const [form, onChangeForm, setForm, onClearForm, checkFormValues] = useForm(initForm);

  const checkAllFormCompleted: boolean = Object.keys(checkFormValues).every((key) => checkFormValues[key]);

  const [processText, setProcessText] = useState<HelpTextType | "">("");
  const isRecordMode: boolean = systemMode === "record";

  const onClear: () => void = () => {
    setStatus(STATUS.waitID);
    onClearForm();
  };

  const onRecord: () => Promise<void> = async () => {
    if (isAutoGPS && navigator.geolocation && checkFormValues.id) {
      setProcessText(HelpTextType.gpsFinding);
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const lat: string = latitude.toFixed(6).toString();
          const long: string = longitude.toFixed(6).toString();
          if (latitude && longitude) {
            setForm({ ...form, lat: lat, long: long });
          }
          setProcessText("");
        },
        (err) => {
          console.log("fetch gps err:", err.message);
          setProcessText(HelpTextType.gpsFail);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setProcessText(HelpTextType.requiredField);
    }

    if (checkAllFormCompleted) {
      const distanceFromCenter: number = coordinateToKilometers([parseFloat(form?.lat), parseFloat(form?.long)], centerCoordinate);
      if (distanceFromCenter >= maxDistance) {
        setProcessText(HelpTextType.locationOutArea);
        return;
      }
      await updateLocation({
        variables: {
          lat: parseFloat(form?.lat),
          lng: parseFloat(form?.long),
          dn_v: parseInt(form?.id),
        },
      });
    }
  };

  const onCheck: () => Promise<void> = async () => {
    if (form.id) {
      await updateLocation({
        variables: {
          lat: -1,
          lng: -1,
          dn_v: parseInt(form?.id),
        },
      });

      return;
    }
    setProcessText(HelpTextType.requiredField);
  };

  if (error) console.log("error:", error);

  useEffect(() => {
    if (loading) {
      setStatus(STATUS.loading);
    }
    if (data) {
      const { latlngMessage, latlngStatus, status, statusMessage }: UpdateLocationCheckSDType = data.updateLocationCheckSD;
      if (status && latlngStatus) {
        setStatus(STATUS.found);
      } else if (!latlngStatus) {
        setStatus(STATUS.noDevice); // TODO: change a new status
      } else if (!status) {
        setStatus(STATUS.notFound);
      } else {
        console.log("latlngMessage: ", latlngMessage);
        console.log("statusMessage: ", statusMessage);
        setStatus(STATUS.notFound);
      }
    }
  }, [loading]);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 ">
      <form className="w-full mb-3">
        <div className="w-full px-3">
          <InputID deviceID={form.id} onChangeForm={onChangeForm} status={status} />
        </div>
        {isRecordMode ? (
          <div className="flex flex-wrap ">
            <div className="w-2/4 px-3 ">
              <InputCoordinate labelId="lat" labelText="latitude" coordinate={form.lat} onChangeCoordinate={onChangeForm} isDisable={isAutoGPS} />
            </div>
            <div className="w-2/4  md:w-1/2 px-3">
              <InputCoordinate labelId="long" labelText="longitude" coordinate={form.long} onChangeCoordinate={onChangeForm} isDisable={isAutoGPS} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
      <div className="flex flex-row justify-center items-center w-5/6">
        <ButtonForm status={status} onCheckDevice={systemMode === "record" ? onRecord : onCheck} onClear={onClear} />
      </div>
      {<HelpText text={processText} />}
      <ClearButton onClear={onClear} />
    </div>
  );
};

export default Form;
