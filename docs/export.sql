SELECT
    u.email,
    u.phoneNumber AS telefon,
    u.group AS skupina,
    u.createdAt AS registrace,

    u.age AS vek,

    CASE
        when u.maritalStatus = 1 then 'Žiji s manželem'
        when u.maritalStatus = 2 then 'Žiji s partnerem'
        when u.maritalStatus = 3 then 'Žiji sama'
        when u.maritalStatus = 4 then 'Vdova'
        when u.maritalStatus = 5 then 'Jiný - prosím doplňte'
        ELSE '-'
        END AS status,

    u.maritalStatusDescription AS status_doplneni,

    CASE
        when u.educationalAttainment = 1 then 'Základní včetně neukončeného'
        when u.educationalAttainment = 2 then 'Střední včetně vyučení bez maturity'
        when u.educationalAttainment = 3 then 'Střední s maturitou'
        when u.educationalAttainment = 4 then 'Vyšší odborné vzdělání'
        when u.educationalAttainment = 5 then 'Vysokoškolské bakalářské'
        when u.educationalAttainment = 6 then 'Vysokoškolské magisterské'
        when u.educationalAttainment = 7 then 'Vyšší'
        ELSE '-'
        END AS stav,

    CASE
        when u.population = 1 then '1 – 999'
        when u.population = 2 then '1 000 - 4 999'
        when u.population = 3 then '5 000 - 9 999'
        when u.population = 4 then '10 000 - 49 999'
        when u.population = 5 then '50 000 - 99 999'
        when u.population = 6 then '100 000 a více'
        ELSE '-'
        END AS populace,

    CASE
        when u.actualState = 1 then 'Těhotná'
        when u.actualState = 2 then 'V šestinedělí'
        when u.actualState = 3 then 'Po šestinedělí do 1 roku dítěte'
        when u.actualState = 4 then 'Od porodu uběhl víc jak rok'
        ELSE '-'
        END AS stav,

    u.numberOfChildren AS pocet_deti,
    u.registrationLabel AS registrace,

    (SELECT label FROM user_questionnaire uq_1_epds WHERE uq_1_epds.questionnaireId = 1 AND uq_1_epds.userId = u.id) AS EPDS1,
    (SELECT label FROM user_questionnaire uq_1_pass WHERE uq_1_pass.questionnaireId = 2 AND uq_1_pass.userId = u.id) AS PASS1,

    (SELECT label FROM user_questionnaire uq_2_epds WHERE uq_2_epds.questionnaireId IN (8,12)  AND uq_2_epds.userId = u.id) AS EPDS2,
    (SELECT label FROM user_questionnaire uq_2_pass WHERE uq_2_pass.questionnaireId IN (9,13) AND uq_2_pass.userId = u.id) AS PASS2

FROM `user` u

WHERE u.finishedRegistration = 1 and u.afterMonthPlanned AND createdAt > '2021-06-27 0:0:0'
