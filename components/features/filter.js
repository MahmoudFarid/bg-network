import FormInput from './../forms/formInput'

export default function Filter({
  register,
  errors,
  name,
  label1,
  labelTxt1,
  label2,
  labelTxt2,
  width,
  preventShowLetter,
}) {
  
  return (
    <div>
      <h3 className="text-black text-sm font-bold mb-3">{name}</h3>
      {
        width !== 'w-5/12' ?
        <div className={`inline-block mr-5 ${width}`}>
          <FormInput
            register={register}
            errors={errors}
            label={name + label1}
            labelTxt={labelTxt1}
            type="text"
            req={false}
            onKeyUp={preventShowLetter}
          />
        </div>
        :
        <div>
          <div className={`inline-block mr-5 ${width}`}>
            <FormInput
              register={register}
              errors={errors}
              label={name + label1}
              labelTxt={labelTxt1}
              type="text"
              req={false}
              onKeyUp={preventShowLetter}
            />
          </div>
          <div className={`inline-block mr-5 ${width}`}>
            <FormInput
              register={register}
              errors={errors}
              label={name + label2}
              labelTxt={labelTxt2}
              type="text"
              req={false}
              onKeyUp={preventShowLetter}
            />
          </div>
        </div>
      }
    </div>
  )
}
