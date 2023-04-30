export class TextPiece {

    constructor(
        public id: String,
        public target: String,
        public textLanguageMap: Map<String, String>
    ){
        textLanguageMap.set('#main-page','');
        textLanguageMap.set('#application','');
        textLanguageMap.set('#application-stork','');
        textLanguageMap.set('#application-not-stork','');
        textLanguageMap.set('#application-waiting-list','');
        textLanguageMap.set('#dorms','');
        textLanguageMap.set('#organization','');
        textLanguageMap.set('#cabinet','');
        textLanguageMap.set('#presidency','');
        textLanguageMap.set('#elections','');
        textLanguageMap.set('#calendar','');
        textLanguageMap.set('#transparency','');
        textLanguageMap.set('#documents','');
        textLanguageMap.set('#connection','');
    }
}