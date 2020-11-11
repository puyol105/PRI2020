<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="tabsite/index.html">
            <html>
                <head>
                    <title>
                        Arqueossitios NW
                    </title>
                </head>
                <body>
                    <a name="indice"></a>
                    <h3>
                        Arqueossitios NW
                    </h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(COCNCEL=preceding::CONCEL)]">
                            <xsl:sort select="normalize-space(CONCEL)"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Templates para o indice -->
    
    <xsl:template match="ARQELEM">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="CONCEL"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="tabsite/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <p><b>Descrição</b>: <xsl:value-of select="DESCRI"/></p>
                    <xsl:if test="CRONO">
                        <p><b>Cronologia</b>: 
                            <xsl:value-of select="CRONO"/>
                        </p>
                    </xsl:if>
                    <p><b>Localização</b>: 
                        <xsl:value-of select="CODADM"/> - 
                        <xsl:value-of select="LUGAR"/>, 
                        <xsl:value-of select="FREGUE"/>, 
                        <xsl:value-of select="CONCEL"/></p>
                    <p><b>Coordenadas</b>: 
                        <xsl:value-of select="LATITU"/>; 
                        <xsl:value-of select="LONGIT"/> 
                        (<xsl:value-of select="ALTITU"/>)</p>
                    <p><b>Acesso</b>: <xsl:value-of select="ACESSO"/></p>
                    <xsl:if test="QUADRO">
                        <p><b>Quadro</b>: 
                            <xsl:value-of select="QUADRO"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="TRAARQ">
                        <p><b>Traarq</b>: 
                            <xsl:value-of select="TRAARQ"/>
                        </p>
                    </xsl:if>
                    <p><b>Desarq</b>: <xsl:value-of select="DESARQ"/></p>
                    <xsl:if test="INTERP">
                        <p><b>InterP</b>: 
                            <xsl:value-of select="INTERP"/>
                        </p>
                    </xsl:if>
                    <xsl:if test="INTERE">
                        <p><b>InterE</b>: 
                            <xsl:value-of select="INTERE"/>
                        </p>
                    </xsl:if>
                    
                    <xsl:if test="DEPOSI">
                        <p><b>Depositado em</b>: 
                            <xsl:value-of select="DEPOSI"/></p>
                    </xsl:if>
                    <xsl:for-each select="BIBLIO">
                        <p><b>Bibliografia</b>: 
                            <xsl:value-of select="."/>
                        </p>
                    </xsl:for-each>
                    <p><b>Autoria</b>: 
                        <xsl:value-of select="AUTOR"/> 
                        (<xsl:value-of select="DATA"/>)</p>
                    <address>[<a href="index.html#i{generate-id()}">Voltar ao índice</a>]</address>
                    
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
</xsl:stylesheet>