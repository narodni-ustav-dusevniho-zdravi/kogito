<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210531101955 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE blog_article (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, author_id INT DEFAULT NULL, added DATETIME NOT NULL, updated DATETIME NOT NULL, published DATETIME NOT NULL, title_cs LONGTEXT NOT NULL, title_en LONGTEXT NOT NULL, small_title_cs LONGTEXT NOT NULL, small_title_en LONGTEXT NOT NULL, slug LONGTEXT NOT NULL, slug_en LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, main_text_cs LONGTEXT NOT NULL, main_text_en LONGTEXT NOT NULL, enable TINYINT(1) DEFAULT \'1\' NOT NULL, display_on_blog_page TINYINT(1) DEFAULT \'1\' NOT NULL, seo_robots_cs LONGTEXT NOT NULL, seo_robots_en LONGTEXT NOT NULL, seo_page_title_cs LONGTEXT NOT NULL, seo_page_title_en LONGTEXT NOT NULL, seo_content_cs LONGTEXT NOT NULL, seo_content_en LONGTEXT NOT NULL, display_on_homepage TINYINT(1) DEFAULT \'0\' NOT NULL, INDEX IDX_EECCB3E512469DE2 (category_id), INDEX IDX_EECCB3E5F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE blog_author (id INT AUTO_INCREMENT NOT NULL, added DATETIME NOT NULL, name_cs LONGTEXT NOT NULL, name_en LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, description_cs LONGTEXT NOT NULL, description_en LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE blog_category (id INT AUTO_INCREMENT NOT NULL, added DATETIME NOT NULL, updated DATETIME NOT NULL, name_cs LONGTEXT NOT NULL, name_en LONGTEXT NOT NULL, slug LONGTEXT NOT NULL, slug_en LONGTEXT NOT NULL, position INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE blog_gallery_image (id INT AUTO_INCREMENT NOT NULL, article_id INT DEFAULT NULL, added DATETIME NOT NULL, name_cs LONGTEXT NOT NULL, name_en LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, INDEX IDX_52261E107294869C (article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE component (id INT AUTO_INCREMENT NOT NULL, page_id INT DEFAULT NULL, admin_description LONGTEXT NOT NULL, enabled TINYINT(1) DEFAULT \'0\' NOT NULL, position INT DEFAULT 0 NOT NULL, `group` INT DEFAULT 0 NOT NULL, type VARCHAR(50) NOT NULL, data JSON NOT NULL COMMENT \'(DC2Type:json_array)\', INDEX IDX_49FEA157C4663E4 (page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fos_user_group (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_583D1F3E5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fos_user_user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, date_of_birth DATETIME DEFAULT NULL, firstname VARCHAR(64) DEFAULT NULL, lastname VARCHAR(64) DEFAULT NULL, website VARCHAR(64) DEFAULT NULL, biography VARCHAR(1000) DEFAULT NULL, gender VARCHAR(1) DEFAULT NULL, locale VARCHAR(8) DEFAULT NULL, timezone VARCHAR(64) DEFAULT NULL, phone VARCHAR(64) DEFAULT NULL, facebook_uid VARCHAR(255) DEFAULT NULL, facebook_name VARCHAR(255) DEFAULT NULL, facebook_data JSON DEFAULT NULL, twitter_uid VARCHAR(255) DEFAULT NULL, twitter_name VARCHAR(255) DEFAULT NULL, twitter_data JSON DEFAULT NULL, gplus_uid VARCHAR(255) DEFAULT NULL, gplus_name VARCHAR(255) DEFAULT NULL, gplus_data JSON DEFAULT NULL, token VARCHAR(255) DEFAULT NULL, two_step_code VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_C560D76192FC23A8 (username_canonical), UNIQUE INDEX UNIQ_C560D761A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_C560D761C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fos_user_user_group (user_id INT NOT NULL, group_id INT NOT NULL, INDEX IDX_B3C77447A76ED395 (user_id), INDEX IDX_B3C77447FE54D947 (group_id), PRIMARY KEY(user_id, group_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE frequently_asked_question (id INT AUTO_INCREMENT NOT NULL, added DATETIME NOT NULL, updated DATETIME NOT NULL, question_cs LONGTEXT NOT NULL, question_en LONGTEXT NOT NULL, answer_cs LONGTEXT NOT NULL, answer_en LONGTEXT NOT NULL, enable TINYINT(1) DEFAULT \'1\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE global_settings (id INT AUTO_INCREMENT NOT NULL, created DATETIME NOT NULL, email_resender_target_email VARCHAR(100) DEFAULT NULL, email_resender_from_email VARCHAR(100) DEFAULT NULL, enabled_languages JSON NOT NULL COMMENT \'(DC2Type:json_array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE menu (id INT AUTO_INCREMENT NOT NULL, handle VARCHAR(100) NOT NULL, admin_description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE menu_item (id INT AUTO_INCREMENT NOT NULL, menu_id INT NOT NULL, parent INT DEFAULT NULL, target_page_id INT DEFAULT NULL, enabled TINYINT(1) DEFAULT \'1\' NOT NULL, type INT NOT NULL, position INT NOT NULL, name VARCHAR(100) NOT NULL, name_translated JSON NOT NULL COMMENT \'(DC2Type:json_array)\', open_in_target_blank TINYINT(1) DEFAULT \'0\' NOT NULL, target_href LONGTEXT NOT NULL, target_href_translated JSON NOT NULL COMMENT \'(DC2Type:json_array)\', INDEX IDX_D754D550CCD7E912 (menu_id), INDEX IDX_D754D5503D8E604F (parent), INDEX IDX_D754D550C72EDA8F (target_page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT AUTO_INCREMENT NOT NULL, seo_params_id INT NOT NULL, seo_params_en_id INT DEFAULT NULL, admin_description LONGTEXT NOT NULL, handle VARCHAR(100) NOT NULL, slug VARCHAR(100) NOT NULL, slug_en VARCHAR(100) NOT NULL, page_title VARCHAR(75) NOT NULL, page_title_en VARCHAR(75) NOT NULL, position INT NOT NULL, enabled TINYINT(1) DEFAULT \'0\' NOT NULL, template LONGTEXT NOT NULL, headline LONGTEXT DEFAULT NULL, text_content LONGTEXT DEFAULT NULL, enable_change_handle TINYINT(1) DEFAULT \'1\' NOT NULL, enable_change_slug TINYINT(1) DEFAULT \'1\' NOT NULL, enable_changing_components TINYINT(1) DEFAULT \'0\' NOT NULL, UNIQUE INDEX UNIQ_140AB620E61D2C4A (seo_params_id), UNIQUE INDEX UNIQ_140AB620EB36C7D2 (seo_params_en_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page_modal (id INT AUTO_INCREMENT NOT NULL, page_modal_id LONGTEXT NOT NULL, added DATETIME NOT NULL, updated DATETIME NOT NULL, title_cs LONGTEXT NOT NULL, title_en LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, content_cs LONGTEXT NOT NULL, content_en LONGTEXT NOT NULL, link_cs LONGTEXT NOT NULL, link_en LONGTEXT NOT NULL, text_link_cs LONGTEXT NOT NULL, text_link_en LONGTEXT NOT NULL, close_text_link_cs LONGTEXT NOT NULL, close_text_link_en LONGTEXT NOT NULL, enable TINYINT(1) DEFAULT \'0\' NOT NULL, display_on_all_pages TINYINT(1) DEFAULT \'0\' NOT NULL, type INT NOT NULL, start DATETIME NOT NULL, end DATETIME NOT NULL, delay INT DEFAULT 0 NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE modal_on_page (page_modal_id INT NOT NULL, page_id INT NOT NULL, INDEX IDX_341975F5C6A1607 (page_modal_id), INDEX IDX_341975F5C4663E4 (page_id), PRIMARY KEY(page_modal_id, page_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE question (id INT AUTO_INCREMENT NOT NULL, added DATETIME NOT NULL, updated DATETIME NOT NULL, ip_address VARCHAR(50) NOT NULL, full_name VARCHAR(200) NOT NULL, email LONGTEXT NOT NULL, phone_number LONGTEXT NOT NULL, message LONGTEXT NOT NULL, status INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE seo_params (id INT AUTO_INCREMENT NOT NULL, last_update DATETIME DEFAULT NULL, page_title LONGTEXT NOT NULL, admin_description LONGTEXT NOT NULL, robots LONGTEXT NOT NULL, display_in_site_map TINYINT(1) DEFAULT \'1\' NOT NULL, site_map_priority VARCHAR(50) NOT NULL, description LONGTEXT NOT NULL, key_words LONGTEXT NOT NULL, author LONGTEXT NOT NULL, og_title LONGTEXT NOT NULL, og_site_name LONGTEXT NOT NULL, og_description LONGTEXT NOT NULL, og_image LONGTEXT DEFAULT NULL, og_image_alt LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE acl_classes (id INT UNSIGNED AUTO_INCREMENT NOT NULL, class_type VARCHAR(200) NOT NULL, UNIQUE INDEX UNIQ_69DD750638A36066 (class_type), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE acl_security_identities (id INT UNSIGNED AUTO_INCREMENT NOT NULL, identifier VARCHAR(200) NOT NULL, username TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8835EE78772E836AF85E0677 (identifier, username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE acl_object_identities (id INT UNSIGNED AUTO_INCREMENT NOT NULL, parent_object_identity_id INT UNSIGNED DEFAULT NULL, class_id INT UNSIGNED NOT NULL, object_identifier VARCHAR(100) NOT NULL, entries_inheriting TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_9407E5494B12AD6EA000B10 (object_identifier, class_id), INDEX IDX_9407E54977FA751A (parent_object_identity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE acl_object_identity_ancestors (object_identity_id INT UNSIGNED NOT NULL, ancestor_id INT UNSIGNED NOT NULL, INDEX IDX_825DE2993D9AB4A6 (object_identity_id), INDEX IDX_825DE299C671CEA1 (ancestor_id), PRIMARY KEY(object_identity_id, ancestor_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE acl_entries (id INT UNSIGNED AUTO_INCREMENT NOT NULL, class_id INT UNSIGNED NOT NULL, object_identity_id INT UNSIGNED DEFAULT NULL, security_identity_id INT UNSIGNED NOT NULL, field_name VARCHAR(50) DEFAULT NULL, ace_order SMALLINT UNSIGNED NOT NULL, mask INT NOT NULL, granting TINYINT(1) NOT NULL, granting_strategy VARCHAR(30) NOT NULL, audit_success TINYINT(1) NOT NULL, audit_failure TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_46C8B806EA000B103D9AB4A64DEF17BCE4289BF4 (class_id, object_identity_id, field_name, ace_order), INDEX IDX_46C8B806EA000B103D9AB4A6DF9183C9 (class_id, object_identity_id, security_identity_id), INDEX IDX_46C8B806EA000B10 (class_id), INDEX IDX_46C8B8063D9AB4A6 (object_identity_id), INDEX IDX_46C8B806DF9183C9 (security_identity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE blog_article ADD CONSTRAINT FK_EECCB3E512469DE2 FOREIGN KEY (category_id) REFERENCES blog_category (id)');
        $this->addSql('ALTER TABLE blog_article ADD CONSTRAINT FK_EECCB3E5F675F31B FOREIGN KEY (author_id) REFERENCES blog_author (id)');
        $this->addSql('ALTER TABLE blog_gallery_image ADD CONSTRAINT FK_52261E107294869C FOREIGN KEY (article_id) REFERENCES blog_article (id)');
        $this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA157C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE fos_user_user_group ADD CONSTRAINT FK_B3C77447A76ED395 FOREIGN KEY (user_id) REFERENCES fos_user_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fos_user_user_group ADD CONSTRAINT FK_B3C77447FE54D947 FOREIGN KEY (group_id) REFERENCES fos_user_group (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE menu_item ADD CONSTRAINT FK_D754D550CCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (id)');
        $this->addSql('ALTER TABLE menu_item ADD CONSTRAINT FK_D754D5503D8E604F FOREIGN KEY (parent) REFERENCES menu_item (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE menu_item ADD CONSTRAINT FK_D754D550C72EDA8F FOREIGN KEY (target_page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620E61D2C4A FOREIGN KEY (seo_params_id) REFERENCES seo_params (id)');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620EB36C7D2 FOREIGN KEY (seo_params_en_id) REFERENCES seo_params (id)');
        $this->addSql('ALTER TABLE modal_on_page ADD CONSTRAINT FK_341975F5C6A1607 FOREIGN KEY (page_modal_id) REFERENCES page_modal (id)');
        $this->addSql('ALTER TABLE modal_on_page ADD CONSTRAINT FK_341975F5C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE acl_object_identities ADD CONSTRAINT FK_9407E54977FA751A FOREIGN KEY (parent_object_identity_id) REFERENCES acl_object_identities (id)');
        $this->addSql('ALTER TABLE acl_object_identity_ancestors ADD CONSTRAINT FK_825DE2993D9AB4A6 FOREIGN KEY (object_identity_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE acl_object_identity_ancestors ADD CONSTRAINT FK_825DE299C671CEA1 FOREIGN KEY (ancestor_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B806EA000B10 FOREIGN KEY (class_id) REFERENCES acl_classes (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B8063D9AB4A6 FOREIGN KEY (object_identity_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B806DF9183C9 FOREIGN KEY (security_identity_id) REFERENCES acl_security_identities (id) ON UPDATE CASCADE ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE blog_gallery_image DROP FOREIGN KEY FK_52261E107294869C');
        $this->addSql('ALTER TABLE blog_article DROP FOREIGN KEY FK_EECCB3E5F675F31B');
        $this->addSql('ALTER TABLE blog_article DROP FOREIGN KEY FK_EECCB3E512469DE2');
        $this->addSql('ALTER TABLE fos_user_user_group DROP FOREIGN KEY FK_B3C77447FE54D947');
        $this->addSql('ALTER TABLE fos_user_user_group DROP FOREIGN KEY FK_B3C77447A76ED395');
        $this->addSql('ALTER TABLE menu_item DROP FOREIGN KEY FK_D754D550CCD7E912');
        $this->addSql('ALTER TABLE menu_item DROP FOREIGN KEY FK_D754D5503D8E604F');
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA157C4663E4');
        $this->addSql('ALTER TABLE menu_item DROP FOREIGN KEY FK_D754D550C72EDA8F');
        $this->addSql('ALTER TABLE modal_on_page DROP FOREIGN KEY FK_341975F5C4663E4');
        $this->addSql('ALTER TABLE modal_on_page DROP FOREIGN KEY FK_341975F5C6A1607');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620E61D2C4A');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620EB36C7D2');
        $this->addSql('ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B806EA000B10');
        $this->addSql('ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B806DF9183C9');
        $this->addSql('ALTER TABLE acl_object_identities DROP FOREIGN KEY FK_9407E54977FA751A');
        $this->addSql('ALTER TABLE acl_object_identity_ancestors DROP FOREIGN KEY FK_825DE2993D9AB4A6');
        $this->addSql('ALTER TABLE acl_object_identity_ancestors DROP FOREIGN KEY FK_825DE299C671CEA1');
        $this->addSql('ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B8063D9AB4A6');
        $this->addSql('DROP TABLE blog_article');
        $this->addSql('DROP TABLE blog_author');
        $this->addSql('DROP TABLE blog_category');
        $this->addSql('DROP TABLE blog_gallery_image');
        $this->addSql('DROP TABLE component');
        $this->addSql('DROP TABLE fos_user_group');
        $this->addSql('DROP TABLE fos_user_user');
        $this->addSql('DROP TABLE fos_user_user_group');
        $this->addSql('DROP TABLE frequently_asked_question');
        $this->addSql('DROP TABLE global_settings');
        $this->addSql('DROP TABLE menu');
        $this->addSql('DROP TABLE menu_item');
        $this->addSql('DROP TABLE page');
        $this->addSql('DROP TABLE page_modal');
        $this->addSql('DROP TABLE modal_on_page');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE seo_params');
        $this->addSql('DROP TABLE acl_classes');
        $this->addSql('DROP TABLE acl_security_identities');
        $this->addSql('DROP TABLE acl_object_identities');
        $this->addSql('DROP TABLE acl_object_identity_ancestors');
        $this->addSql('DROP TABLE acl_entries');
    }
}
