import Cloudflare from 'cloudflare';
import 'dotenv/config';
import chalk from 'chalk';

const connectDB = async () => {
  console.log('Connecting to database');
  try {
    return new Cloudflare({
      apiEmail: process.env['CLOUDFLARE_EMAIL'], // This is the default and can be omitted
      apiKey: process.env['CLOUDFLARE_API_KEY'], // This is the default and can be omitted
    });
  } catch (e) {
    console.log(chalk.red('数据库连接失败：', e.message));
    process.exit(1);
  }
};

export default connectDB;

// const d1 = await client.d1.database.get(process.env['D1_DATABASE_ID'], {
//   account_id: process.env['CLOUDFLARE_ACCOUNT_ID']
// });
// console.log(d1);
