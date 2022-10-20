import 'dotenv/config';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, BatchWriteCommandInput, DeleteCommand, DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { Character } from '../models/Character';

const dynamoDbClient = new DynamoDBClient({
    region: process.env.AWS_DEFAULT_REGION,
    // admin credentials, full access
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

const TABLE_NAME = 'harrypotter-api';

export async function getCharacters() {
    const input: ScanCommandInput = {
        TableName: TABLE_NAME
    };

    const command = new ScanCommand(input);
    const output = await dynamoDbClient.send(command);
    return output.Items;
}

export async function putCharacter(character: Character) {
    const input: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: character
    };

    const command = new PutCommand(input);
    const output = await dynamoDbClient.send(command);
    return output.$metadata?.httpStatusCode;
}

export async function putCharacters(characters: Character[]) {
    const input: BatchWriteCommandInput = {
        RequestItems: {
            [TABLE_NAME]: characters.map(character => ({
                PutRequest: {
                    Item: character
                }
            }))
        }
    };
    const command = new BatchWriteCommand(input);
    const output = await dynamoDbClient.send(command);
    return output.$metadata?.httpStatusCode;
}

export async function getCharacterById(id: string) {
    const input: GetCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    const command = new GetCommand(input);
    const output = await dynamoDbClient.send(command);
    return output.Item as Character || null;
}

export async function deleteCharacterById(id: string) {
    const params: DeleteCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    const command = new DeleteCommand(params);
    const output = await dynamoDbClient.send(command);
    return output.$metadata?.httpStatusCode;
}
