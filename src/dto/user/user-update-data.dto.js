import { nameDTOSchema, surnameDTOSchema ,languageDTO} from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateDataDTOSchema = Type.Object(
    {
        name: nameDTOSchema,
        surname: surnameDTOSchema,
        language: languageDTO,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'format_object_invalid',
        },
    }
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });

    next();
};

export default userUpdateDataDTO;
