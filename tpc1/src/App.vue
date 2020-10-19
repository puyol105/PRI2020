<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" />
          <v-col cols="12" sm="4">
            <v-img
              contain
              max-height="210"
              max-width="497"
              src="https://i.ibb.co/5jWBjRS/esferografica.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
      <br />

      <v-container>
        <v-card>
          <v-parallax
            src="https://img.wallpapersafari.com/desktop/1680/1050/72/93/IOma0Q.jpg"
          >
            <v-row align="center">
              <v-col cols="12" md="2" />
              <v-col class="text-center" cols="12" md="6">
                <h1 class="font-weight-thin font-italic">
                  "The pen is the language of the soul. As the concepts that in
                  it are generated, such will be its writings."
                </h1>

                <h2 class="text-right font-weight-thin font-italic">
                  🇪🇸 Miguel de Cervantes Saavedra
                </h2>
              </v-col>
            </v-row>
          </v-parallax>
        </v-card>
      </v-container>
      <div />
      <br />
      <br />
      <br />
      <v-container>
        <v-card color="#202020">
          <v-row align="center">
            <v-col cols="12" sm="1" />
            <v-col cols="12" sm="3">
              <v-col cols="12" sm="2" />
              <v-img
                contain
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/John_Jacob_Loud_01.png/400px-John_Jacob_Loud_01.png"
              ></v-img>
            </v-col>
            <v-col class="text-center" cols="12" md="7">
              <h1
                class="font-weight-light font-italic"
                v-bind:style="styleObject2"
              >
                Um Pouco de História
              </h1>
              <v-card-text
                class="text-xl text-center text-justify font-weight-light"
                v-bind:style="styleObject"
              >
                <!-- Falta meter a identação do 1ºparagrafo -->
                Numa tentativa de inventar uma caneta que pudesse escrever em
                couro, o inventor John J. Loud criou a primeira caneta
                esferográfica e patenteou-a em 1888 nos Estados Unidos da
                América. Esta caneta tinha uma pequena bola de aço que foi
                colocada de forma que não pudesse caire que tivesse a liberdade
                de girar em 360 graus. Todavia, esta invenção não era
                comercialmente viável e não podia ser usada para escrita e como
                consequencia disso esta patente ficou perdida no tempo. Contudo,
                esta foi a primeira referência a uma esferógrafica de ponta
                redonda e como tal é atribuída a sua invenção a Jonh J. Loud.
              </v-card-text>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="1" />
            <v-col cols="12" sm="3">
              <v-card-text class="text-center" v-bind:style="styleObject3">
                🇺🇸 Jonh J. Loud (1844-1916)
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <div />
      <br />
      <br />
      <br />
      <v-form>
        <v-container>
          <v-card>
            <v-card-title class="justify-center">
              Experimente aqui a sua esferográfica
            </v-card-title>
            <v-row>
              <v-col cols="12" md="1" />
              <v-col cols="12" md="6">
                <v-text-field
                  placeholder="Deixa aqui a tua marca"
                  :color="picker"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      block
                      elevation="2"
                      class="ma-2"
                      @click="dialog = true"
                      large
                      text
                      >Muda de tinta</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title> Escolha a cor da sua tinta </v-card-title>
                    <v-color-picker
                      hide-inputs
                      flat
                      @input="atualizarPicker"
                    ></v-color-picker>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Mudar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <!-- <v-col cols="12" md="3">
              <v-btn  block elevation="2" large text >Enviar Mensagem</v-btn>
            </v-col> -->
            </v-row>
          </v-card>
        </v-container>
      </v-form>
      <br />
      <br />
      <br />
      <v-container>
        <v-divider />
      </v-container>
      <v-container>
        <v-card-text href="https://github.com/puyol105">
          A75310 - Renato Cruzinha
        </v-card-text>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  title: "Esferográfica",

  components: {},

  data: () => ({
    dialog: false,

    picker: "#000",

    styleObject: {
      fontSize: "20px",
      color: "#FFF",
    },

    styleObject2: {
      fontSize: "40px",
      color: "#FFF",
    },

    styleObject3: {
      fontSize: "15px",
      color: "#FFF",
    },
  }),
  methods: {
    atualizarPicker(novoValor) {
      this.picker = novoValor.hexa;
    },
  },
  computed: {
    cssTextField() {
      return {
        color: this.picker,
      };
    },
  },
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}

.text-field input {
  color: picker !important;
}
</style>
