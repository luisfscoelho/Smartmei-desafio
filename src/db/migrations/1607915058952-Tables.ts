import {MigrationInterface, QueryRunner} from "typeorm";

export class Tables1607915058952 implements MigrationInterface {
    name = 'Tables1607915058952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookLoans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "returnedAt" TIMESTAMP, "fromUserId" uuid NOT NULL, "toUserId" uuid NOT NULL, "bookId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c431bf31c0c4c61d5160f034bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "pages" integer NOT NULL, "ownerId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookLoans" ADD CONSTRAINT "FK_3bf7e4c2abee1209900faa8c8b0" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookLoans" ADD CONSTRAINT "FK_df262357ddf216b1f914b622acb" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookLoans" ADD CONSTRAINT "FK_80f4e2d5e1981f481be8430e075" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_82209aa3c485bb7f7e7e8374c66" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_82209aa3c485bb7f7e7e8374c66"`);
        await queryRunner.query(`ALTER TABLE "bookLoans" DROP CONSTRAINT "FK_80f4e2d5e1981f481be8430e075"`);
        await queryRunner.query(`ALTER TABLE "bookLoans" DROP CONSTRAINT "FK_df262357ddf216b1f914b622acb"`);
        await queryRunner.query(`ALTER TABLE "bookLoans" DROP CONSTRAINT "FK_3bf7e4c2abee1209900faa8c8b0"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bookLoans"`);
    }

}
