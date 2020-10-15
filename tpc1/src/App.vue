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

      <v-container>
        <v-card>
          <v-parallax
            src="https://img.wallpapersafari.com/desktop/1680/1050/72/93/IOma0Q.jpg"
          >
            <v-row align="center">
              <v-col cols="12" md="2" />
              <v-col class="text-center" cols="12" md="6">
                <h1 class="font-weight-thin font-italic">
                  The pen is the language of the soul. As the concepts that in
                  it are generated, such will be its writings.
                </h1>
                <v-spacer><p></p> </v-spacer>
                <v-spacer><p></p> </v-spacer>
                <v-spacer><p></p> </v-spacer>
                <h2 class="text-right font-weight-thin font-italic"
                  >Miguel de Cervantes Saavedra</h2
                >
              </v-col>
            </v-row>
          </v-parallax>
        </v-card>
      </v-container>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <v-container>
        <v-card>
          <h1>Um pouco de historia</h1>
        </v-card>
      </v-container>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Solo"
                placeholder="Deixa aqui a tua marca"
                solo
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="3">
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    block
                    elevation="2"
                    class="ma-2"
                    @click="dialog3 = true"
                    large
                    text
                    >Muda a tinta</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title> Escolha a cor da sua tinta </v-card-title>
                  <v-card>
                    <v-color-picker
                      v-model="picker"
                      hide-inputs
                      elevation="15"
                    ></v-color-picker>
                  </v-card>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Mudar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <v-btn
                block
                elevation="2"
                class="ma-2"
                @click="dialog3 = true"
                large
                text
                >Muda a tinta</v-btn
              > -->
            </v-col>
            <!-- <v-col cols="12" md="3">
              <v-btn  block elevation="2" large text >Enviar Mensagem</v-btn>
            </v-col> -->
          </v-row>
        </v-container>
      </v-form>
      <v-container> </v-container>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <div />
      <p>espaço</p>
      <v-container>
        <v-card>
          <v-parallax
            src="https://img.wallpapersafari.com/desktop/1680/1050/72/93/IOma0Q.jpg"
          >
            <v-row align="center" justify="center">
              <v-col class="text-center" cols="12">
                <h1 class="font-weight-thin text-justify mb-4">
                  Canetas esferográficas são um tipo de caneta cuja tinta
                  envolve uma esfera rolante que desliza sobre a superfície
                  destinada à escrita, disponível em várias cores. Na evolução
                  da caneta, o uso de uma esfera na ponta possibilitou a
                  distribuição constante e uniforme de tinta, e popularizou o
                  uso deste instrumento de escrita ao mesmo tempo em que
                  substituía com vantagem a caneta-tinteiro. Com a invenção da
                  caneta as pessoas passaram a escrever cartas, postais e
                  livros. Hoje em dia a caneta esferográfica é usada
                  universalmente para escrever apontamentos e fazer testes.
                </h1>
              </v-col>
            </v-row>
            <h1>História</h1>
          </v-parallax>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    dialog: false,
  }),
};
</script>
